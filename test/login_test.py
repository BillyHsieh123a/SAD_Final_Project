import pytest
import json
from unittest.mock import Mock, patch, MagicMock
from flask import Flask
from backend import login  # Import your login blueprint


@pytest.fixture
def app():
    """Create a Flask app for testing"""
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.secret_key = 'test-secret-key'  # Needed for session management
    app.register_blueprint(login)
    return app


@pytest.fixture
def client(app):
    """Create a test client"""
    return app.test_client()


@pytest.fixture
def mock_db_connection():
    """Mock the database connection and cursor"""
    mock_conn = Mock()
    mock_cursor = Mock()
    mock_conn.cursor.return_value = mock_cursor
    return mock_conn, mock_cursor


class TestHandleLogin:
    """Test class for the handle_login function"""
    
    @patch('login.get_psql_conn')
    def test_successful_login_with_email(self, mock_get_conn, client, mock_db_connection):
        """Test successful login using email"""
        # Arrange
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        
        # Mock database response (user found)
        mock_cursor.fetchall.return_value = [
            (1, 'John', 'Doe', '1234567890', 'john@email.com', '1990-01-01', 'M')
        ]
        
        # Test data
        login_data = {
            'email_or_phone': 'john@email.com',
            'user_password': 'password123'
        }
        
        # Act
        response = client.post('/submit_login', 
                             data=json.dumps(login_data),
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 200
        
        response_data = json.loads(response.data)
        assert response_data['success'] == 1
        assert 'session' in response_data
        assert response_data['session']['user_id'] == 1
        assert response_data['session']['user_fname'] == 'John'
        assert response_data['session']['login'] == True
        
        # Verify database was called correctly
        mock_cursor.execute.assert_called_once()
        executed_query = mock_cursor.execute.call_args[0][0]
        assert 'email' in executed_query
        assert mock_cursor.execute.call_args[0][1] == ['john@email.com', 'password123']
    
    
    @patch('login.get_psql_conn')
    def test_successful_login_with_phone(self, mock_get_conn, client, mock_db_connection):
        """Test successful login using phone number"""
        # Arrange
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        
        # Mock database response
        mock_cursor.fetchall.return_value = [
            (2, 'Jane', 'Smith', '9876543210', 'jane@email.com', '1995-05-15', 'F')
        ]
        
        # Test data
        login_data = {
            'email_or_phone': '9876543210',
            'user_password': 'mypassword'
        }
        
        # Act
        response = client.post('/submit_login',
                             data=json.dumps(login_data),
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 200
        
        response_data = json.loads(response.data)
        assert response_data['success'] == 1
        assert response_data['session']['user_id'] == 2
        assert response_data['session']['phone'] == '9876543210'
        
        # Verify phone query was used
        executed_query = mock_cursor.execute.call_args[0][0]
        assert 'phone' in executed_query
        assert mock_cursor.execute.call_args[0][1] == ['9876543210', 'mypassword']
    
    
    @patch('login.get_psql_conn')
    def test_failed_login_wrong_credentials(self, mock_get_conn, client, mock_db_connection):
        """Test failed login with wrong credentials"""
        # Arrange
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        
        # Mock database response (no user found)
        mock_cursor.fetchall.return_value = []
        
        # Test data
        login_data = {
            'email_or_phone': 'wrong@email.com',
            'user_password': 'wrongpassword'
        }
        
        # Act
        response = client.post('/submit_login',
                             data=json.dumps(login_data),
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 200
        
        response_data = json.loads(response.data)
        assert response_data['success'] == 0
        assert response_data['error'] == 'Wrong account or password.'
        assert 'session' not in response_data
    
    
    @patch('login.get_psql_conn')
    def test_login_with_missing_data(self, mock_get_conn, client):
        """Test login with missing required data"""
        # Test data missing password
        login_data = {
            'email_or_phone': 'test@email.com'
            # missing 'user_password'
        }
        
        # Act & Assert
        with pytest.raises(KeyError):
            response = client.post('/submit_login',
                                 data=json.dumps(login_data),
                                 content_type='application/json')
    
    
    def test_login_with_invalid_json(self, client):
        """Test login with invalid JSON data"""
        # Act
        response = client.post('/submit_login',
                             data='invalid json',
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 400  # Bad Request
    
    
    @patch('login.get_psql_conn')
    def test_database_connection_error(self, mock_get_conn, client):
        """Test behavior when database connection fails"""
        # Arrange
        mock_get_conn.return_value = None
        
        login_data = {
            'email_or_phone': 'test@email.com',
            'user_password': 'password123'
        }
        
        # Act & Assert
        with pytest.raises(AttributeError):  # Will fail when trying to call cursor() on None
            response = client.post('/submit_login',
                                 data=json.dumps(login_data),
                                 content_type='application/json')


# Additional test for edge cases
class TestLoginEdgeCases:
    
    @patch('login.get_psql_conn')
    def test_phone_number_detection(self, mock_get_conn, client, mock_db_connection):
        """Test that phone numbers are correctly detected vs emails"""
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        mock_cursor.fetchall.return_value = []
        
        # Test pure digits (should be treated as phone)
        login_data = {'email_or_phone': '1234567890', 'user_password': 'pass'}
        client.post('/submit_login', data=json.dumps(login_data), content_type='application/json')
        
        executed_query = mock_cursor.execute.call_args[0][0]
        assert 'phone' in executed_query
        
        # Reset mock
        mock_cursor.reset_mock()
        
        # Test email format (should be treated as email)
        login_data = {'email_or_phone': 'user@domain.com', 'user_password': 'pass'}
        client.post('/submit_login', data=json.dumps(login_data), content_type='application/json')
        
        executed_query = mock_cursor.execute.call_args[0][0]
        assert 'email' in executed_query


if __name__ == '__main__':
    # Run the tests
    pytest.main([__file__, '-v'])