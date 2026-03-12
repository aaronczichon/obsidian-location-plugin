# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.3] - 2026-03-12

### Fixed

- [💎] Version mismatch
- [💎] replacing old GH action used in release workflow

## [2.1.1] - 2026-03-11

### Fixed

- [💎] Fixed a problem where a higher min version than available was used

## [2.1.0] - 2026-03-09

### Added

- [🚀] Processing dataview variables before rendering map (#54)
- [🚀] `multi-location` supports now different marker icons per location (#48)
- [🚀] `interactive-location` support now multiple locations (#47)

## [2.0.2] - 2025-05-22

### Fixed

- [💎] Code blocks now support styles according to documentation (not mapbox strings) #51

## [2.0.1] - 2025-05-12

### Fixed

- [🐛] Fixed issue with empty data file

## [2.0.0] - 2025-01-24

### Added

- [🚀] Deployment to Cloudflare Pages + Warning for `under development` of documentation
- [🚀] Added command support for default map style, marker color, custom marker URL and API token update
- [🚀] Added first PoC support for interactive maps (and single marker)
- [🚀] Documentation site with Docusaurus
- [🚀] Added command support for marker size and reverse order
- [🚀] Added new `multi-location` block support. You can now add multiple markers to one image

### Changed

- [⚙️] Removed some unused parameters
- [⚙️] ci: Updated build workflow to use update version of `mainfest.json` file
- [⚙️] Code structure to support new processor blocks
- [⚙️] Added `.prettierrc` config to force correct formatting (e.g. single quotes)
- [⚙️] Adde better typings for some functions

## [1.3.0] - 2024-08-06

### Added

- [🚀] Added option to search for a location inside location block (@nehnehneh)
- [🚀] Supporting alternate syntax using [latitude, longitude] array (#18)
- [🚀] Allow reverse order of coordinates (e.g. if copied from Google Maps) via setting (#21)

### Changed

- [⚙️] ci: added step to check commit messages on build workflow

### Fixed

- [🐛] Fixed issue with custom marker icon not being displayed correctly

## [1.2.0] - 2024-07-26

### Added

- [🚀] Adding support for custom zoom level (thanks to @nehnehneh)

## [1.1.1] - 2024-06-11

### Fixed

- [💎] Renaming `Custom Marker Icon URL` to `Custom marker URL` to follow Obsidian guidelines
- [💎] Showing a toast notice if the user uses an invalid combination of maki icon and custom marker url
- [💎] Showing a notice if the plugin has updated so that the user may check for new features

## [1.1.0] - 2024-05-14

### Added

- [🚀] Adding support for custom icons and different maki icons (#15)
- [🚀] Adding support for different map styles (#17)
- [📚] Adding documentation new documentation file
