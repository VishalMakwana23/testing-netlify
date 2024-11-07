import media1 from "./gallery1.png";
import media2 from "./gallery2.png";
import media3 from "./gallery3.png";
import media4 from "./gallery4.png";
import media5 from "./gallery5.jpeg";

export const media = [media1, media2, media3, media4];
export const mediaByIndex = index => media[index % media.length];