# Changelog

Here's a list of the things we've changed, added or removed since we started working on Floodwatch

---

#### 02/03/2022

## First roud of refinements

#### Fixes & Updates

-   Changed nav to be vertical instead of horizontal.
-   Resolved issue with nav showing up over pop ups, modals and drawers.
-   Updated events query to be handled client side

#### Additions

-   Wrapped application in Redux to preserve event state, and allow application to only get most recent events since last load.
-   Added pin clustering, so when zoomed out pins don't look super clutter and difficult to navigate

---

#### 01/03/2022

## Initial Launch

#### Additions

-   Can now click on different parts of the map to drop a pin and create an event
-   Can create a basic event with type, note, image and severity
-   Can view events on a map against their location
-   Can see basic app information with About, Help and Contact sections
