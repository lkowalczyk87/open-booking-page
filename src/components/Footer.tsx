import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeSelector } from "state/selectors/theme";
import { userPreferenceAtom } from "state/atoms/userPreference";

const Wrapper = styled(Row)`
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;

  & > .left-column {
    width: 175px;
    align-items: center;
    flex-wrap: wrap;
  }

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    padding: 0 20px;
  }
`;

const VerticalLine = styled.div`
  margin-top: 8px;
  height: ${({ theme }) => theme.typography.label.lineHeight};
  border-left: 1px solid ${({ theme }) => theme.colors.darkGrey};
`;

const TimeRiseLogo = styled.img`
  margin-left: 10px;
  height: 10px;
  margin-bottom: 5px;
`;

export const FooterLinkWrapper = styled.div`
  & > * {
    font-style: normal;
    display: block;
    text-decoration: none;
    white-space: nowrap;
    margin-top: 8px;

    ${({ theme }) => {
      const typographyTheme = theme.typography.label;
      return css`
        font-size: ${typographyTheme.size};
        font-weight: ${typographyTheme.weight};
        line-height: ${typographyTheme.lineHeight};
        color: ${theme.colors.darkGrey};

        &:hover {
          color: ${theme.colors.dark};
        }
      `;
    }}
  }
`;

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  white-space: nowrap;
  margin-top: 8px;

  ${({ theme }) => {
    const typographyTheme = theme.typography.label;
    return css`
      font-size: ${typographyTheme.size};
      font-weight: ${typographyTheme.weight};
      line-height: ${typographyTheme.lineHeight};
      color: ${theme.colors.darkGrey};

      &:hover {
        color: ${theme.colors.dark};
      }
    `;
  }}
`;

const StyledLink = styled.a`
  height: 10px;
`;

const footerLogo: Record<"light" | "dark", string> = {
  dark: "https://cdn.timerise.io/app/timerise-logo-invert.png",
  light: "https://cdn.timerise.io/app/timerise-logo.png",
};

const Footer = () => {
  const { t } = useTranslation();
  const themeType = useRecoilValue(themeSelector);
  const setUserPreference = useSetRecoilState(userPreferenceAtom);

  return (
    <Wrapper mb={1.5} mt={5} jc="space-between">
      <Row className="left-column">
        <Typography
          typographyType="label"
          color="darkGrey"
          as="div"
          style={{ whiteSpace: "nowrap", marginTop: "8px" }}
        >
          {t("footer.copyright")}
        </Typography>
        <VerticalLine />
        <StyledButton
          onClick={() =>
            setUserPreference({
              theme: themeType === "dark" ? "light" : "dark",
            })
          }
        >
          {t(`theme.${themeType === "dark" ? "light" : "dark"}`)}
        </StyledButton>
      </Row>
      <Row ai="flex-start" style={{ marginTop: "8px" }}>
        <Typography typographyType="label" as="div" color="darkGrey">
          {t("footer.powered by")}
        </Typography>
        <StyledLink href="https://timerise.io/" target="_blank">
          <TimeRiseLogo
            src={footerLogo[themeType]}
            alt="timerise logo"
            data-cy="time-rise-footer-logo"
          />
        </StyledLink>
      </Row>
    </Wrapper>
  );
};

export default Footer;
