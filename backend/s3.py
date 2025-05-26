from flask import request, jsonify
import boto3
from werkzeug.utils import secure_filename
from botocore.exceptions import NoCredentialsError
import os
from dotenv import load_dotenv
import uuid

# S3 設定
s3_setting = {
    "S3_BUCKET": None,
    "S3_REGION": None,
    "S3_ACCESS_KEY": None,
    "S3_SECRET_KEY": None,
}

def init_s3():
    global s3_setting
    load_dotenv()
    s3_setting['S3_BUCKET'] = os.getenv("S3_BUCKET")
    s3_setting['S3_REGION'] = os.getenv("S3_REGION")
    s3_setting['S3_ACCESS_KEY'] = os.getenv("S3_ACCESS_KEY")
    s3_setting['S3_SECRET_KEY'] = os.getenv("S3_SECRET_KEY")

s3 = boto3.client('s3',
                  region_name=s3_setting['S3_REGION'],
                  aws_access_key_id=s3_setting['S3_ACCESS_KEY'],
                  aws_secret_access_key=s3_setting['S3_SECRET_KEY'])

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_presigned_url(filename):
    # 產生 pre-signed URL
    presigned_url = s3.generate_presigned_url(
        ClientMethod='get_object',
        Params={
            'Bucket': s3_setting['S3_BUCKET'],
            'Key': filename
        },
        ExpiresIn=300
    )
    return presigned_url

# 通用的上傳處理函式
def upload_to_s3(prefix):
    if 'photo' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['photo']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        unique_id = uuid.uuid4().hex
        filename = f"{prefix}/{unique_id}_{secure_filename(file.filename)}"

        try:
            # 上傳為私有（不加 ACL）
            s3.upload_fileobj(
                file,
                s3_setting['S3_BUCKET'],
                filename,
                ExtraArgs={'ContentType': file.content_type}
            )

            return jsonify({'message': 'Upload successful', 'filename': filename, 'presigned_url': get_presigned_url(filename)}), 200

        except NoCredentialsError:
            return jsonify({'error': 'AWS credentials not found'}), 500

    return jsonify({'error': 'Invalid file type'}), 400

# @app.get('/preview/<path:filename>')
# def preview_image(filename):
#     try:
#         s3_obj = s3.get_object(Bucket=s3_setting['S3_BUCKET'], Key=filename)
#         return send_file(
#             io.BytesIO(s3_obj['Body'].read()),
#             mimetype=s3_obj['ContentType']
#         )
#     except Exception as e:
#         return jsonify({'error': str(e)}), 404
    
# if __name__ == '__main__':
#     app.run(debug=True)
