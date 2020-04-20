# New Style And Styleguid Construction
## create scss files & supporting folders
    * Compontents
      * Base File: src\scss\components\__components.[new project].scss
      * Supporting Folder: src\scss\components\[new project]  
    * Reciepes 
      * Base File: src\scss\recipes\__recipes.[new project].scss
      * Supporting Folder: src\scss\components\[new project]  
    * Setup
      * Base File: src\scss\setup\__brand.[new project].scss
    * Base
      * Base File: src\scss\base\__base.[new project].scss


## create mark down files. 
  *  Base File:  markdown/partials/partial_[new project]_[framework].md

## create new gulp task
     gulp.task(
       "build-[new project]",
       gulp.series(
         function() {
           var brand = "[new project]";
           var framework = "[framework]";
           var uc = constructUCStyleSheet(brand);
           uc = buildbrand(uc, brand, "");
           var base = constructFrameworkStyleSheet(brand, framework);
           base = buildbrand(base, brand, framework);
           merge(base, uc)
             .pipe(header("/** Test 7 **/\n"))
             .pipe(gulp.dest(PATHS.SCSS));
           return runSass(brand);
         },
         "dist",
         "copy-to-styleguide",
         function() {
           var brand = "[new project]";
           var framework = "[framework]";
           var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
           var base = markdownbuild(base, brand + "_" + framework);
           return merge(base)
             .pipe(
               header(
                 fs.readFileSync(
                   PATHS.MARKDOWN + "markdown_preheader.md",
                   "utf8"
                 )
               )
             )
             .pipe(gulp.dest(SOURCE.MD));
         },
         function() {
           return run("npm run [framework]_[new project]").exec();
         }
       )
     );

     
## create new kss-config file
  * Base File: "kss-config_boot_[new project].json"
    * Alter all path pionts in the docuemnt. 
    * "title"
    * "mask"
    * "destination"
    * "homepage"
    * "css"
    * "site_nav"

## create new script in package.json