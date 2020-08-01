1. compress the background image
2. compress the js file
3. delete unnecessary 3rd party script
4. defer js files
5. get rid of the refreshing "hello" word, which greatly reduced performances.
Performance: 2 to 53.
Kind of unstable as I tried many times with same version. The canvas display is kind of unstable.(can comment it out to improve performaces but that makes the page look plain and not as good aesthetically).
Cannot make further improvement without making huge change on the original design and style.
Adding firebase auth/database part for ec also reduce the old performances score. 


Accessibility:
1. Add title for iframe.
2. Add name attribute in <a> tag.
Accessibility: 88 t0 100.


Desisgn:
1. Add background color for contact part.
2. Add blog section, which displays the blogs stored in firebase database.
3. Add background for blog. 
4. Add the Go to blog section in nav bar, which can add, delete, update, posts etc.
5. Add the blog login and management page. 
6. Add the log out function. 