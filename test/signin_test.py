import pytest
import json
from unittest.mock import Mock, patch
from flask import Flask
from backend import signin  # Import your signin blueprint


@pytest.fixture
def app():
    """Create a Flask app for testing"""
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.register_blueprint(signin)
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


@pytest.fixture
def valid_signin_data():
    """Sample valid signin data"""
    return {
        'fname': 'John',
        'lname': 'Doe',
        'password': 'securepassword123',
        'phone': '1234567890',
        'email': 'john.doe@email.com',
        'bdate': '1990-01-15',
        'gender': 'male'
    }


class TestSigninSignin:
    """Test class for the signin_signin function"""
    
    @patch('signin.get_psql_conn')
    def test_successful_user_registration(self, mock_get_conn, client, mock_db_connection, valid_signin_data):
        """Test successful user registration"""
        # Arrange
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        
        # Mock successful database insertion (no exception raised)
        mock_cursor.execute.return_value = None
        mock_conn.commit.return_value = None
        
        # Act
        response = client.post('/signin_',
                             data=json.dumps(valid_signin_data),
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 200
        
        response_data = json.loads(response.data)
        assert response_data['message'] == 'successfully registered!'
        
        # Verify database calls
        mock_cursor.execute.assert_called_once()
        mock_conn.commit.assert_called_once()
        
        # Check the SQL query parameters
        call_args = mock_cursor.execute.call_args
        sql_query = call_args[0][0]
        parameters = call_args[0][1]
        
        assert 'INSERT INTO public."user"' in sql_query
        assert parameters == ('John', 'Doe', 'securepassword123', '1234567890', 
                            'john.doe@email.com', '1990-01-15', 'M')
    
    
    @patch('signin.get_psql_conn')
    def test_database_error_handling(self, mock_get_conn, client, mock_db_connection, valid_signin_data):
        """Test error handling when database operation fails"""
        # Arrange
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        
        # Mock database error
        mock_cursor.execute.side_effect = Exception('Database constraint violation')
        
        # Act
        response = client.post('/signin_',
                             data=json.dumps(valid_signin_data),
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 500
        
        response_data = json.loads(response.data)
        assert 'error' in response_data
        assert 'Database constraint violation' in response_data['error']
        
        # Verify rollback was called
        mock_conn.rollback.assert_called_once()
        mock_conn.commit.assert_not_called()
    
    
    @patch('signin.get_psql_conn')
    def test_database_connection_failure(self, mock_get_conn, client, valid_signin_data):
        """Test behavior when database connection is None"""
        # Arrange
        mock_get_conn.return_value = None
        
        # Act & Assert
        with pytest.raises(AttributeError):  # Will fail when trying to call cursor() on None
            response = client.post('/signin_',
                                 data=json.dumps(valid_signin_data),
                                 content_type='application/json')
    
    
    def test_missing_required_fields(self, client):
        """Test registration with missing required fields"""
        # Test cases with missing fields
        incomplete_data_cases = [
            {'lname': 'Doe', 'password': 'pass', 'phone': '123', 'email': 'a@b.com', 'bdate': '1990-01-01', 'gender': 'M'},  # missing fname
            {'fname': 'John', 'password': 'pass', 'phone': '123', 'email': 'a@b.com', 'bdate': '1990-01-01', 'gender': 'M'},  # missing lname
            {'fname': 'John', 'lname': 'Doe', 'phone': '123', 'email': 'a@b.com', 'bdate': '1990-01-01', 'gender': 'M'},  # missing password
            {'fname': 'John', 'lname': 'Doe', 'password': 'pass', 'email': 'a@b.com', 'bdate': '1990-01-01', 'gender': 'M'},  # missing phone
            {'fname': 'John', 'lname': 'Doe', 'password': 'pass', 'phone': '123', 'bdate': '1990-01-01', 'gender': 'M'},  # missing email
            {'fname': 'John', 'lname': 'Doe', 'password': 'pass', 'phone': '123', 'email': 'a@b.com', 'gender': 'M'},  # missing bdate
            {'fname': 'John', 'lname': 'Doe', 'password': 'pass', 'phone': '123', 'email': 'a@b.com', 'bdate': '1990-01-01'}  # missing gender
        ]
        
        for incomplete_data in incomplete_data_cases:
            # Act
            response = client.post('/signin_',
                                 data=json.dumps(incomplete_data),
                                 content_type='application/json')
            
            # Assert - Should return 500 error due to missing data
            assert response.status_code == 500
            response_data = json.loads(response.data)
            assert 'error' in response_data
    
    
    def test_invalid_json_data(self, client):
        """Test registration with invalid JSON"""
        # Act
        response = client.post('/signin_',
                             data='invalid json data',
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 400  # Bad Request
    
    
    @patch('signin.get_psql_conn')
    def test_empty_string_fields(self, mock_get_conn, client, mock_db_connection):
        """Test registration with empty string fields"""
        # Arrange
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        
        empty_data = {
            'fname': '',
            'lname': '',
            'password': '',
            'phone': '',
            'email': '',
            'bdate': '',
            'gender': 'M'
        }
        
        # Act
        response = client.post('/signin_',
                             data=json.dumps(empty_data),
                             content_type='application/json')
        
        # Assert - Should still work (empty strings are valid)
        assert response.status_code == 200
        
        # Check that empty strings were passed to database
        call_args = mock_cursor.execute.call_args
        parameters = call_args[0][1]
        assert parameters[0] == ''  # fname
        assert parameters[1] == ''  # lname


# Integration-style test (closer to real usage)
class TestSigninIntegration:
    """Integration-style tests for signin functionality"""
    
    @patch('signin.get_psql_conn')
    def test_complete_user_registration_flow(self, mock_get_conn, client, mock_db_connection):
        """Test the complete user registration flow with realistic data"""
        # Arrange
        mock_conn, mock_cursor = mock_db_connection
        mock_get_conn.return_value = mock_conn
        
        realistic_user_data = {
            'fname': 'Alice',
            'lname': 'Johnson',
            'password': 'MySecurePassword123!',
            'phone': '+1-555-123-4567',
            'email': 'alice.johnson@example.com',
            'bdate': '1985-07-22',
            'gender': 'Female'
        }
        
        # Act
        response = client.post('/signin_',
                             data=json.dumps(realistic_user_data),
                             content_type='application/json')
        
        # Assert
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['message'] == 'successfully registered!'
        
        # Verify the exact data that would be inserted
        call_args = mock_cursor.execute.call_args
        sql_query = call_args[0][0]
        parameters = call_args[0][1]
        
        expected_params = ('Alice', 'Johnson', 'MySecurePassword123!', 
                          '+1-555-123-4567', 'alice.johnson@example.com', 
                          '1985-07-22', 'F')
        assert parameters == expected_params
        
        # Verify SQL structure
        assert 'INSERT INTO public."user"' in sql_query
        assert 'VALUES(%s, %s, %s, %s, %s, %s, %s, \'U\')' in sql_query


if __name__ == '__main__':
    # Run the tests
    pytest.main([__file__, '-v'])