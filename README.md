Basic Gulp Task Runner Setup

I am using pug to generate html, babel for javascript and sass for css via autoprefixer.

browserSync is watching the files.

There is image optimization with options you can tweek as you like.

There is a task to move fonts and useref to concatenate css and js.

This project comes with bootstrap4 bundle css/js , lodash and jquery. (change in src(js|css) folders the version you want for bootstrap/jquery/lodash);


You need to cd in client directory and  run 'npm i' in the command line in order to have node_modules installed accordingly.

Edit the files from src folder as it is suitable to your website.

Then run in your command line from client folder 'gulp start' for development.

or 

run 'gulp build' to generate the files in dist folder.

Output is generated to the client/dist folder and it is production ready.