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
                  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzNhOTM5OTAtOGJiNC00YjlkLWI0MjItNGY4ODUxMjE3ZDdlLyIsImlhdCI6MTY5MzIwNDU0NywibmJmIjoxNjkzMjA0NTQ3LCJleHAiOjE2OTMyMDk4MTgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VUFBQUFMZ2FFQnB4ejJxY3FYYmVwWkRydmxQNkhtWXVDSDVYMDU2aGJRTWE4N29PaCttMDRvUFNCK05QNGZDalVvT09LIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiR0FSQ0lBIENBU1RFTExBTk9TIiwiZ2l2ZW5fbmFtZSI6IkZFUk5BTkRPIEVOUklRVUUiLCJpcGFkZHIiOiIxOTAuNTMuMjQ5LjIwOCIsIm5hbWUiOiJGRVJOQU5ETyBFTlJJUVVFIEdBUkNJQSBDQVNURUxMQU5PUyIsIm9pZCI6IjE1OGEwMTExLTc3MmItNDJkZi05YmRiLTllZmQzYzdlNDcxYSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS03NzgxMTMyOTUtMjAyMDU4MzM4NC0xMzIwMTc5MC0zNzAyODEiLCJwdWlkIjoiMTAwMzAwMDBBNzA2QzNDRiIsInJoIjoiMC5BVmtBa0RtcE03U0xuVXUwSWstSVVTRjlmZ2tBQUFBQUFBQUF3QUFBQUFBQUFBQlpBSWMuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiSE5FaGt6aUdUT0lJcTVaQmlHRlBHMGRVdkY0YXhScFExM3hydWo1TWQxMCIsInRpZCI6IjMzYTkzOTkwLThiYjQtNGI5ZC1iNDIyLTRmODg1MTIxN2Q3ZSIsInVuaXF1ZV9uYW1lIjoiZmVnYXJjaWFjQHVuYWguaG4iLCJ1cG4iOiJmZWdhcmNpYWNAdW5haC5obiIsInV0aSI6InE2U0JvVk0td1VHUEc2OUw0TEtfQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.c2tv7jgChFeCeVM6ZMz1hRYF03iS5tIq6Y9dUaWAPUdr9ef_1I9c3HCdLsQ2H2V9BBlyWdxaNtm6GZCdDeFr_WSyE_5gqX_LKN62pUwwobxd55tUTnlNEXHQjnIbrgBM8rSCpIxQtO07By-DOV7hh7zw0WJvgQpyRoeupS3bgKob_XOU7xncY5EhEUjwfV2vxp0H97pQ_KKxZu0yGlpIyxKyIi6h2PvXMEotez6DwEhfFvho98qK0zRKZ6SPZESlERNomALHsTB8YbmAj1eDon7T4TDAbe4wFFu_KwHBvn--z-RioklwoQS8XpmXFxbDwxIXk_XWgRITFXUyjDu3_w",
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
