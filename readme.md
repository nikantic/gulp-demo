# Gulp demo

A Gulp project to showcase automation of frontend website development workflow. It includes various tasks and asset processing depending on the set environment (development or production). 

## Features

- Sass compiling, compression and CSS auto vendor prefixing
- JavaScript concatenation and minification
- Source maps for assets
- HTML asset injection and comment stripping
- Image compression for many file types (including lossy compression)
- Separate source and distribution folders
- Watch source folders and files for changes, auto update and reload local server
- Auto clean distribution folders when building
- Task error reporting and handling
- Different environments (development and production)
- Task run-order and sequencing
- Building and exporting production website to zip file

## Setup and commands

Make sure you have Node.js, npm and Gulp installed globally. Clone/Download the repository and run `npm install`. 

Use the command-line interface to run some of the following tasks defined in *gulpfile.js:*

- `gulp` - to run the default task which will build the development website and start watching files for changes (to have it run in production environment pass the production flag like this `gulp --production`)

- `gulp build` - to only build the website

- `gulp watch` - to only start watching for changes

- `gulp clean` - to clean (delete) the dist folder

- `gulp export` - to build and export production website to zip file

- ​Any other separate task (*sass, scripts, images*) defined in *gulpfile.js* 

## Environment

By default the project is set to development environment. Each task is considered to run in development environment unless the production flag `--production` is passed in command, like this `gulp build --production`

**Production environment** minifies CSS and JavaScript files and includes lossy image compression. No source maps are generated.

**Development environment** includes source maps for CSS and JavaScript files, excludes file minification and image compression so it runs faster. 

## Built with

- Node.js and npm
- Sass
- Gulp
- Gulp plugins (check the [package.json](package.json) dependencies) 

Website project includes Sass files with *variables* partial where you can set theme to light or dark to test how fast the changes reflect while watching. 