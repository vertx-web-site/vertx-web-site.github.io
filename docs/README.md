This directory is for the AsciiDoc source files of the Vert.x documentation.
Run the following command to download the source files from Maven central:

    npm run update-docs

The downloaded artifacts will be copied to the `download` folder, the extracted
source files to `extracted`, and the compiled Asciidoc files to `compiled`.

Please note, the recommended way to do this is, however, through running
`npm run update-docs` in the root directory of this project!
