export const HeaderTrads = (lang: string) => {
  if (lang === "fr-FR") {
    return {
      home: "Accueil",
      favs: "Favoris",
      cats: "Catégories",
    };
  } else if (lang === "en-US") {
    return {
      home: "Home",
      favs: "Favorites",
      cats: "Categorys",
    };
  } else {
    return {
      home: "Home",
      favs: "Favorites",
      cats: "Categorys",
    };
  }
};
