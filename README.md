# nik-construction

## SCSS File Structure

In the IOD Rebuild, the node-sass package is used to compile the SCSS properly within the React Framework. The SCSS file structure is a commonly used structure, and although there is no one correct structure, we feel this is an effective way of promoting re-usability. Read more about it in the following article: https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4

### The 7-1 Pattern

The 7-1 Pattern is a common SCSS structure for large projects. All of your styles are organized into 7 different folders, and a single file sits at the root level (in our case named main.scss) to handle the imports — which is the file you compile into CSS. So in order to import a newly created scss file to use in the project (for example, buttons styles), simply go to the main.scss file and type @import './components/buttons.scss'. There is no need to import the individual style files into the JavaScript files or anywhere else.

Make sure to import the files in the order they appear in the structure 1) to keep the structure consistent and organized and 2) scss compiles top-down (cascading), so the import order matters and if incorrect, can break the styles.

It's important to note in our case that we only have 5 folders, so technically the 5-1 pattern would be a more fitting name. We found two of the folders to be unnecessary for our use case. The following are the 5 folders we use:

- base
- components
- layout
- pages
- utilities

### Folder Purposes

As you could probably guess, each folder has a purpose. They are the following:

- **_base:_** holds the boilerplate code for the project. These include standard styles such typographic rules, which are commonly used throughout your project.

- **_components:_** holds all of your styles for buttons, carousels, sliders, and similar page components (think widgets). Your project will typically contain a lot of component files — as the whole site/app should be mostly composed of small modules.

- **_layout:_** contains all styles involved with the layout of your project. Such as styles for your header, footer, navigation and the grid system.

- **_pages:_** any styles specific to individual pages will sit here. For example it’s not uncommon for the home page of your site to require page specific styles that no other page receives.

- **_utilities:_** holds Sass tools, helper files, variables, functions, mixins and other config files. These files are meant to be just helpers which don’t output any CSS when compiled.

### Style Pattern

For further code cleanliness and optimization, when selecting a className and writing styles for it try to stick to the following order:

- Mixins
- Positioning (Flex, etc.)
- Width/Height
- Margin/padding/borders
- Font size
- Colors
- Anything else you need to include
