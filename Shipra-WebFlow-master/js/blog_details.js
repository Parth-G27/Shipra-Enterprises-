document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blog_id');
  
    const hey="hello"
    if (blogId) {
        fetch(`https://shipra-backend-yathin-kn.vercel.app/blogs/${blogId}`)
            .then(response => response.json())
            .then(blog => {
              
                const contentWrapper = document.querySelector('.blog-content');
                const breadCrumbs = document.querySelector('.bread');

                breadCrumbs.innerText = blog.postDetails.postTitle || "hello";
  
                blog.content.forEach(item => {
                    if (item !== null) {
                        switch (item.type) {
                            case 'Title':
                                const titleElement = document.createElement('h2');
                                titleElement.innerHTML = item.content.replace(/\n/g, '<br>');
                                contentWrapper.appendChild(titleElement);
                                break;
                            case 'Subtitle':
                                const subtitleElement = document.createElement('h3');
                                subtitleElement.textContent = item.content;
                                contentWrapper.appendChild(subtitleElement);
                                break;
                            case 'Description':
                                const descriptionElement = document.createElement('p');
                                descriptionElement.innerHTML = item.content.replace(/\n/g, '<br>');
                                contentWrapper.appendChild(descriptionElement);
                                break;
                            case 'Image':
                                const imageElement = document.createElement('img');
                                imageElement.src = item.content.imageUrl;
                                imageElement.alt = item.content.imageCaption;
                                contentWrapper.appendChild(imageElement);
                                break;
                            case 'Video':
                                const videoElement = document.createElement('video');
                                videoElement.src = item.content.videoUrl;
                                videoElement.controls = true;
                                contentWrapper.appendChild(videoElement);
                                break;
                            case 'Bullet':
                                const bulletElement = document.createElement('div');
                                bulletElement.className = "bullet-point";
                                const bulletText = document.createElement('p');
                                bulletText.innerHTML = item.content.replace(/\n/g, '<br>');
                                bulletElement.appendChild(bulletText);
                                contentWrapper.appendChild(bulletElement);
                                break;
                            default:
                                break;
                        }
                    }
                });
  
            })
            .catch(error => console.error('Error fetching blog details:', error));
    } else {
        console.error('No blog ID found in the query parameters');
    }
});
