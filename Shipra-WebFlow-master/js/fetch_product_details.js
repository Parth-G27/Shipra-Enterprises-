document.addEventListener('DOMContentLoaded', () => {
    const blogWrapper = document.querySelector('.w-dyn-items');
  
    fetch('https://shipra-backend-yathin-kn.vercel.app/getAllProducts/')
      .then(response => response.json())
      .then(data => {
        data.forEach(blog => {
          const blogCardItem = document.createElement('div');
          blogCardItem.setAttribute('role', 'listitem');
          blogCardItem.classList.add('collection-item', 'w-dyn-item', 'w-col', 'w-col-4');
  
          const blogLink = document.createElement('a');
          blogLink.classList.add('link-block', 'w-inline-block');
          blogLink.href = `product.html?blog_id=${blog.post_id}`; 
  
          const blogCardWrapper = document.createElement('div');
          blogCardWrapper.classList.add('blog-card_wrapper');
  
          const blogCard = document.createElement('div');
          blogCard.classList.add('blog-card');
  
          const blogImage = document.createElement('div');
          blogImage.classList.add('blog-card_image-01');
  
          let postImage = blog.postDetails.postImage;
          const imageContent = blog.content.find(item => item &&  item.type === 'Image');
          if (imageContent && imageContent.content && imageContent.content.imageUrl) {
              postImage = imageContent.content.imageUrl;
          }
          blogImage.style.backgroundImage = `url(${postImage})`;

          const spacingDiv = document.createElement('div');
          spacingDiv.classList.add('spacing_30');
  
          const blogTitle = document.createElement('h5');
          blogTitle.classList.add('blog-card_title');
          blogTitle.textContent = blog.postDetails.postTitle;
  
          blogCard.appendChild(blogImage);
          blogCard.appendChild(spacingDiv);
          blogCard.appendChild(blogTitle);
  
          blogCardWrapper.appendChild(blogCard);
          blogLink.appendChild(blogCardWrapper);
          blogCardItem.appendChild(blogLink);
  
          blogWrapper.appendChild(blogCardItem);
  
          blogLink.addEventListener('click', event => {
            event.preventDefault(); 
            const urlParams = new URL(blogLink.href);
            const blogId = urlParams.searchParams.get('blog_id');
            window.location.href = `product.html?blog_id=${blogId}`; 
          });
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  