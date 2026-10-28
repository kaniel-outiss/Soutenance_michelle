# Soutenance Michelle

Appli de préparation à la soutenance du mémoire « RSE et performance sociale : le cas de l'OAPI ».

Chaque envoi sur `main` produit une release avec :
- `Soutenance-Michelle.apk` (Android, clé de signature fixe : les mises à jour s'installent par-dessus) ;
- `Soutenance-Michelle-Setup.exe` (installateur Windows, se met à jour par-dessus) ;
- `Soutenance-Michelle-portable.exe` (Windows, sans installation).

`app.html` est la source unique : il est copié dans l'appli Android et dans l'appli Windows au moment du build.
