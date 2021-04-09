import { withTranslation } from "react-i18next";

import * as S from "./styles";

const Input = ({ id, name, placeholder, onChange, t }) => (
  <S.Container>
    <span htmlFor={name}>{id}</span>
    <S.Input
      spellcheck="false"
      placeholder={placeholder}
      name={name}
      id={name}
      onChange={onChange}
    />
  </S.Container>
);

export default withTranslation()(Input);
