import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urlparse


url = "https://www.leuphot.com/bep-dung-cu-nau"


folder_name = "Image_data/bep-dung-cu-nau"
os.makedirs(folder_name, exist_ok=True)


response = requests.get(url)


if response.status_code == 200:
  
    soup = BeautifulSoup(response.content, "html.parser")
    

    images = soup.find_all("img")
    
 
 
    for idx, image in enumerate(images):
        image_url = image.get("data-src")
        image_alt = image.get("alt", f"image_{idx + 1}") 
        
        if image_url and image_url.startswith("//bizweb.dktcdn.net/thumb/medium/"):
            image_url = image_url.replace("//bizweb.dktcdn.net/thumb/medium/", "//bizweb.dktcdn.net/thumb/large/")
        
        # Kiểm tra và tải xuống hình ảnh
        if image_url and image_url.startswith("//bizweb.dktcdn.net/thumb/large/"):
            try:
                parsed_url = urlparse(image_url)
                if not parsed_url.scheme:
                    image_url = "https:" + image_url

                image_name = f"{image_alt.replace(' ', '_')}.jpg"
                image_path = os.path.join(folder_name, image_name)
                
                # Tải hình ảnh về thư mục đã tạo
                with open(image_path, "wb") as file:
                    img_data = requests.get(image_url).content
                    file.write(img_data)
                
                print(f"Đã tải xuống {image_name}")
            except Exception as e:
                print(f"Lỗi khi tải xuống ảnh {image_url}: {e}")
    # In đường dẫn tuyệt đối của thư mục lưu trữ hình ảnh
    absolute_path = os.path.abspath(folder_name)
    print(f"Thư mục lưu trữ các hình ảnh: {absolute_path}")
else:
    print("Yêu cầu không thành công, status code:", response.status_code)
