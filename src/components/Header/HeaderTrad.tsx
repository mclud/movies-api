export const HeaderTrads = (lang: string) => {
  if (lang === "fr") {
    return {
      home: "Accueil",
      favs: "Favoris",
      cats: "Catégories",
    };
  } else if (lang === "en") {
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
