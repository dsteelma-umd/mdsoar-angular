# Community Themes

## Introduction

MD-SOAR provides customized themes for the communities associated with each
member institution.

## Adding a theme

The following steps outline how to add a new community theme, using
"mdsoar-example" as the theme to be created.

Community themes should typically be named "mdsoar-\<institution>" where
\<insitution> is the name of the institution.

### umd-lib/mdsoar-angular Changes

The following steps should be made in the "umd-lib/mdsoar-angular" repository
to set up the community theme.

1) Copy one of the existing community theme directories, such as
  "mdsoar-frostburg".

  ```bash
  $ cp --recursive src/themes/mdsoar-frostburg/ src/themes/mdsoar-example/


2) Replace the "src/themes/mdsoar-example/k8s-assets/image/community_logo.png"
   file with the logo image for the institution.

3) Update the src/themes/mdsoar-example/k8s-assets/footer/footer.html" file
   with the information for the institution. When referring to the logo image,
   use "assets/k8s/mdsoar-example/images/community_logo.png"

4) Update the following files, changing "mdsoar-frostburg" to "mdsoar-example":

* src/themes/mdsoar-example/app/breadcrumbs/breadcrumbs.component.ts
* src/themes/mdsoar-example/app/footer/footer.component.ts

5) Add the new theme to "projects/dspace-angular/architect/build/options/styles"
   section of the "angular.json" file:

   ```text
   {
   ...
   "projects": {
     "dspace-angular": {
     ...
       "architect": {
         "build": {
          ...
          "options": {
          ...
          "styles": [
            ...
            {
              "input": "src/themes/mdsoar/styles/theme.scss",
              "inject": false,
              "bundleName": "mdsoar-example-theme"
            },
            ...
   ```

6) Add the theme and the community handle to the "themes" section of the
   "config/config.yml", where \"<COMMUNITY_THEME_HANDLE>" is the community
   handle:

    ```text
    themes:
      ...
      - name: 'mdsoar-example'
        extends: 'mdsoar'
        handle: '<COMMUNITY_THEME_HANDLE>'
    ```

### umd-lib/k8s-mdsoar Changes

The following steps should be made in the "umd-lib/k8s-mdsoar" repository
to set up the community theme.

7) Add the theme and community handle to the "base/config/config.yml" as in Step
   6 above:, where \"<COMMUNITY_THEME_HANDLE>" is the community handle:

    ```text
    themes:
      ...
      - name: 'mdsoar-example'
        extends: 'mdsoar'
        handle: '<COMMUNITY_THEME_HANDLE>'
    ```

8) Add the "k8s-assets" folder for the community to the "k8s-mdsoar" repository.

## Community Theme Required Elements

When asked to create a new community theme, the following elements are required:

1) The handle of the MD-SOAR community to apply the theme to.

    Since handles are not predictable, this implies that the MD-SOAR community
    is created prior to the rollout of the community theme.

2) A logo image for the community. This file is typically a PNG file, with
   a filename of "community_logo.png". There is no standard height/width size,
   however the same logo generally be used in both the breadcrumb trail and
   the footer.

3) The text for the footer. This will typically include:

   * The insitutional logo (the provided logo image)
   * The name of the institutional library
   * The physcial address of the library
   * The URL of the library website
   * A contact email
   * A contact telephone number

## About Community Themes

Each community theme contains the following components that can be customized
the individual institution:

* breadcrumbs - Prepends the institution logo to the breadcrumb trail
* footer - Adds an institution-specific footer with contact information

The community themes leverage the stock DSpace theme customization functionality
(see <https://wiki.lyrasis.org/display/DSDOC7x/User+Interface+Customization>.

Each community theme derives from the global "mdsoar" theme (which in turn is
based on the stock "dspace" theme).

## Differences from stock DSpace Custom Themes

### k8s-assets directory

The community use a "k8s-assets" directory, in place of the standard "assets"
directory, for storing the theme assets. This is done so that the MD-SOAR
Kuberneates configuration (<https://github.com/umd-lib/k8s-mdsoar>) can override
the individual institution assets.

This enables the footer text or logo for an institution to be updated without
having to recreate the MD-SOAR Angular Docker image.

The "k8s-assets" directory will typically have the following structure:

```text
<theme-name>/
  |- k8s-assets
       |- footer
       |    |- footer.html - the HTML fragment containing the footer layout and
       |                     text
       |- images
            |- community_logo.png - the insitution logo
```

The "webpack/webpack.common.ts" configuration file has been modified to map the
"\<theme-name>/k8s-assets/" directory into an "assets/k8s/\<theme-name>/"
directory.

## Developer Notes

As stated above, the community themes largely use the stock DSpace custom
theme functionality, with the essential difference being that the community
logo image and footer text can be customized in Kubernetes.

The "webpack/webpack.common.ts" configuration file has been modified to map the
"\<theme-name>/k8s-assets/" directory into an "assets/k8s/\<theme-name>/"
directory, which generates "dist/server/assets/k8s/" and
"dist/assets/browser/k8s" directories as part of the Docker image build process.

In the "umd-lib/k8s-mdsoar" configuration, both "k8s" directories are replaced
in the "mdsoar-angular" pod are replaced with Kubernetes mounts.

This enables the Kubernetes configuruation to replace any of the community
theme assets with updated versions, without having to rebuild the
"mdsoar-ui" Docker image.

### Footer Component

The footer component retrieves the text to display in the footer from the
"src/themes/mdsoar-frostburg/k8s-assets/footer/footer.html"

One wrinkle is the use of the Component option
`encapsulation: ViewEncapsulation.None,` which enables the CSS styling to be
applied to the dynamic HTML.
