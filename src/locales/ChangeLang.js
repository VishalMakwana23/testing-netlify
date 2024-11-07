import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { languageChange } from "../reducers/language";

export default function ChangeLanguage() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState();
  const dispatch = useDispatch();
  const Lang = useSelector((state) => state.language.lang);

  function handleLanguage(e) {
    setCurrentLang(e.value);
    i18n.changeLanguage(e.value);
    localStorage.setItem("Language", e.value);
    dispatch(languageChange(e.value));
  }

  // setCurrentLang(currLang)
  useEffect(() => {
    setCurrentLang(Lang);
    i18n.changeLanguage(Lang);
    localStorage.setItem("Language", Lang ? Lang : "en");
    // eslint-disable-next-line
  }, []);

  const options = [
    {
      value: "en",
      label: (
        <span
          className="language_select_option"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          English
        </span>
      ),
    },
    {
      value: "de",
      label: (
        <span
          className="language_select_option"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Germany
        </span>
      ),
    },
    {
      value: "ar",
      label: (
        <span
          className="language_select_option"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Arabic
        </span>
      ),
    },
    {
      value: "fr",
      label: (
        <span
          className="language_select_option"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          French
        </span>
      ),
    },
    {
      value: "es",
      label: (
        <span
          className="language_select_option"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Spanish
        </span>
      ),
    },
  ];

  return (
    <Select
      className={`languageSelect ${currentLang}`}
      placeholder={
        Lang === "en"
          ? options[0].label
          : Lang === "de"
            ? options[1].label
            : Lang === "ar"
              ? options[2].label
              : Lang === "fr"
                ? options[3].label
                : options[4].label
      }
      onChange={handleLanguage}
      options={options}
    />
  );
}
