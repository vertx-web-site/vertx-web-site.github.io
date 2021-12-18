# Vert.x documentation

This directory is for the AsciiDoc source files of the Vert.x documentation.
Run the following command to download the source files from Maven central
and to compile them:

    npm run update-docs

Please note that the recommended way to do this is, however, through running
`npm run update-docs` in the root directory of this project!

## Target directories

The script writes files to the following directories:

* `docs/download` - the artifacts downloaded from Maven central
* `docs/extracted` - AsciiDoc source files extracted from the artifacts
* `docs/compiled` - compiled AsciiDoc files
* `public/docs/apidocs` - extracted API docs

## Release a new version

1. Create a metadata file in the [metadata](./metadata) directory for the version you want to release. For example, if you want to release version 4.2.0, create a file called `metadata/4.2.0.jsx`.

2. Import docs from a previous version and create a clone. For example:

    ```js
    import oldDocs from "./4.1.0"
    import { clone } from "./helpers"

    const docs = clone(oldDocs)
    ```

3. Modify `docs` (insert, modify, remove modules). Refer to the section on [utility methods](#utility-methods) for more information. 

    **Attention:** Do not modify `oldDocs` directly! Always edit the cloned `docs`! Otherwise, you will modify the previous version, too.

4. Export the modified docs:

    ```js
    export default docs
    ```

## Release a new version without modification

If the version you want to release should contain the exact same modules as a previous version, you can make use of a shortcut:

1. Create a metadata file in the [metadata](./metadata) directory for the version you want to release. For example, if you want to release version 4.2.0, create a file called `metadata/4.2.0.jsx`.

2. Import the docs from the previous version but directly export them again without modifying them:

    ```js
    export { default } from "./4.1.0"
    ```

## Create a prerelease

Sometimes, you want to create a prerelease (a beta version or a release candidate) that will later be replaced by the actual version. For this, you can download a prerelease artifact (e.g. `4.2.0.Beta1`) but publish it under the path of the final version (e.g. `4.2.0`).

1. Create a metadata file under `docs/metadata` for the **final version** you want to release. For example, if the final version is 4.2.0, create a file called `docs/metadata/4.2.0.jsx`.

2. Import `oldDocs` from a previous version and modify it as described above.

    ```js
    import oldDocs from "./4.1.0"
    import { clone } from "./helpers"

    const docs = clone(oldDocs)
    ```

3. Set the `prerelease` flag and overwrite the artifact version:

    ```js
    docs.prerelease = true
    docs.artifactVersion = "4.2.0.Beta1"
    ```

4. Export the modified docs:

    ```js
    export default docs
    ```

## Data model

### `docs.entries`

A list of objects representing Vert.x modules. Each object has the following attributes:

| Attribute     | Description |
|---------------|-------------|
| `id`          | A unique module identifier. Must match the name of the module's directory in the `vertx-stack-docs` artifact (e.g. `"vertx-core"` or `"vertx-mongo-client"`). |
| `name`        | A human-readable module name (either a string or a JSX element) |
| `description` | A human-readable description (either a string or a JSX element) |
| `category`    | The ID of the category to which this module belongs (see description of `docs.categories` below) |
| `href`        | The relative path to the module's doc page on the Vert.x website (e.g. `"/vertx-core/java/"` for `vertx-core`). Must begin and end with a slash. Must match the name of the module's directory in the `vertx-stack-docs` artifact. |
| `repository`  | A link to the module's source code repository (e.g. `"https://github.com/eclipse-vertx/vert.x"`) |
| `edit`        | A link to the module's AsciiDoc source (e.g. `"https://github.com/eclipse-vertx/vert.x/tree/master/src/main/asciidoc"`) |
| `examples`<br />*(optional)* | A link to example code showing how the module is used (e.g. `"https://github.com/vert-x3/vertx-examples/tree/3.x/core-examples"`)
| `label`<br />*(optional)* | A label that should be displayed next to the module's name on the Vert.x website (e.g. `"Technical Preview"`)

### `docs.categories`

A list of objects representing categories in which modules can be grouped. Each object has the following attributes:

| Attribute     | Description |
|---------------|-------------|
| `id`          | A unique category identifier |
| `name`        | A human-readable category name (either a string or a JSX element) |
| `icon`        | A JSX element representing the icon that should be displayed next to the category's name |

### `docs.preprelease`

A flag specifying if the version is a prerelease (`true`) or not (`false`). Prereleases are displayed in the version drop-down on the docs page but are not selected by default.

The default value is `false`.

### `docs.artifactVersion`

An optional version string that is used when the docs artifact is downloaded from Maven Central. Can be used to implement prereleases that are later replaced by actual versions (see section on [creating a prerelease](#create-a-prerelease)).

By default, this attribute is `undefined` and the name of the metadata file will be used as the version.

## Utility methods

The file [helpers.js](./metadata/helpers.js) defines a few utility methods you can use to modify `docs`.

### `clone(docs)`

Create a deep clone of the given `docs` object.

### `find(docs, id)`

Search `docs.entries` for a module with the given `id`.

### `findCategory(docs, id)`

Search `docs.categories` for a category with the given `id`.

### `insert(docs, beforeEntryId, ...newEntries)`

Insert one or more `newEntries` into `docs.entries`. Insert them before the module with the given `id` (`beforeEntryId`).

### `move(docs, entryId, beforeEntryId)`

Search `docs.entries`, find an existing entry with the given `id` (`entryId`), and move it before the entry with the given `id` (`beforeEntryId`).

### `remove(docs, entryId)`

Remove the entry with the given `id` (`entryId`) from `docs.entries`.
