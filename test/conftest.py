# conftest.py
# 放在你的 test/ 目錄中

import sys
import os

# 將 backend 目錄添加到 Python 路徑
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# 這個文件會在所有測試運行前自動執行，解決導入問題