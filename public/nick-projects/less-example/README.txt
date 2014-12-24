This version of less uses the command and the Ruby Less compiler to create the css file

Using the gem
From the command-line
The command line tool is called lessc, and it looks something like this:

$ lessc source [destination]
The source is the LESS file you want to compile, and the destination is the (optional) CSS file you want to compile it to. If you don't specify a destination, lessc will base it on the source you specified:

go into the folder and run the following in the command line i.e. D:\WAMP\www\jquery\nick-projects\less-example\webapp\css>lessc style.less style.css
lessc style.less style.css
lessc style.less
Are equivalent.

Watching
lessc also comes with an option to watch your .less file for any change, and recompile it automatically:

$ lessc style.less --watch
Now, whenever you save your file, lessc will try to compile it. If there are errors, it will ask you to fix them before continuing.

* Watching for changes in style.less... Ctrl-C to abort.
: Change detected... * [Updated] style.css
:
You can think of : as a pair of eyes watching your file.