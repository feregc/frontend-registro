import "../../styles.css";
// import logo from './logo.svg';
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { useNavigate } from "react-router-dom";

export const Estadisticas = () => {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(`../home`);
  };

  return (
    <>
      <div className="container">
        <div className="row  my-4">
          <div className="col">
            <button className="btn btn-success" onClick={regresar}>
              Atrás
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <PowerBIEmbed
              className="w-100"
              embedConfig={{
                type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                id: "f1cea6c4-1397-4e0d-bb70-77e3ce148b58",
                embedUrl:
                  "https://app.powerbi.com/reportEmbed?reportId=f1cea6c4-1397-4e0d-bb70-77e3ce148b58&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
                accessToken:
                  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzNhOTM5OTAtOGJiNC00YjlkLWI0MjItNGY4ODUxMjE3ZDdlLyIsImlhdCI6MTY5MzE4NzU0MywibmJmIjoxNjkzMTg3NTQzLCJleHAiOjE2OTMxOTI0MjgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VUFBQUFMUnluK3NIZFM3bTF0emZFUWZjeGFUcHNFU1RGcDhadjNPMXBDMTAvOHMyd0VYajljL1Yyb2NHSFN6SEZYek5jIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiR0FSQ0lBIENBU1RFTExBTk9TIiwiZ2l2ZW5fbmFtZSI6IkZFUk5BTkRPIEVOUklRVUUiLCJpcGFkZHIiOiIxOTAuNTMuMjQ5LjIwOCIsIm5hbWUiOiJGRVJOQU5ETyBFTlJJUVVFIEdBUkNJQSBDQVNURUxMQU5PUyIsIm9pZCI6IjE1OGEwMTExLTc3MmItNDJkZi05YmRiLTllZmQzYzdlNDcxYSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS03NzgxMTMyOTUtMjAyMDU4MzM4NC0xMzIwMTc5MC0zNzAyODEiLCJwdWlkIjoiMTAwMzAwMDBBNzA2QzNDRiIsInJoIjoiMC5BVmtBa0RtcE03U0xuVXUwSWstSVVTRjlmZ2tBQUFBQUFBQUF3QUFBQUFBQUFBQlpBSWMuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiSE5FaGt6aUdUT0lJcTVaQmlHRlBHMGRVdkY0YXhScFExM3hydWo1TWQxMCIsInRpZCI6IjMzYTkzOTkwLThiYjQtNGI5ZC1iNDIyLTRmODg1MTIxN2Q3ZSIsInVuaXF1ZV9uYW1lIjoiZmVnYXJjaWFjQHVuYWguaG4iLCJ1cG4iOiJmZWdhcmNpYWNAdW5haC5obiIsInV0aSI6InVwYWtKMGt5TTBxZkhMUzhoWkN0QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.ViD6y0ABuAD2la8V3O5Ds3gSYqu4olC7nq_vc65Oz2m731kC2USq8wMxgv8fYoyN8wLGb6jk5vFFaipy3Varg6HBGohT1xuVGn-s4tgxl_rEPIJNpiX7ZVPs3NIdBOTZr_8rFRJ-uLlucoWxmNvSCTHe9H_voC6luevlPXAljhcOaGKn-GwaazC0EJgNKSgIxFP87sPqNvb5J6amGZHz2Xjwp9MMNT-JfSzdG0w5DlzFOSDjhognHz22cNCRVyDIaq29ZrzQ3Vvd3kv1yizI_dXcBdAWcSA6GR4m-HvB76t9VfrxlmxeoDzsjAUExnTg7fMLPj7aDLrfCvTJhsiwRA",
                tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: true,
                    },
                  },
                },
              }}
              eventHandlers={
                new Map([
                  [
                    "loaded",
                    function () {
                      console.log("Report loaded");
                    },
                  ],
                  [
                    "rendered",
                    function () {
                      console.log("Report rendered");
                    },
                  ],
                  [
                    "error",
                    function (event) {
                      console.log(event.detail);
                    },
                  ],
                  ["visualClicked", () => console.log("visual clicked")],
                  ["pageChanged", (event) => console.log(event)],
                ])
              }
              cssClassName={"Embed-container"}
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="App">
              <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
              </header>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
