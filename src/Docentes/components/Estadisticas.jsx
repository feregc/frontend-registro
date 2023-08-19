import "../../styles.css";
// import logo from './logo.svg';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { useNavigate } from "react-router-dom";


export const Estadisticas = () => {

    const navigate = useNavigate();

    const regresar = () => {
        navigate(`../home`);
    };

    return (
        <>
            <button className="btn btn-success my-3" onClick={regresar}>
                Atras
            </button>
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <PowerBIEmbed
                        embedConfig={{
                            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                            id: '81dd1d52-a570-4d59-9aeb-3234ffcf320c',
                            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=81dd1d52-a570-4d59-9aeb-3234ffcf320c&groupId=cadf9fc5-53aa-4a44-8233-6533fdc68f51&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
                            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzNhOTM5OTAtOGJiNC00YjlkLWI0MjItNGY4ODUxMjE3ZDdlLyIsImlhdCI6MTY5MjQxNDM2NiwibmJmIjoxNjkyNDE0MzY2LCJleHAiOjE2OTI0MTg3ODEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VUFBQUFNQWJmcHVLVzk5TnpZQzRpK1FQTHpIVFhPb2hPVlMzMW1SRE41TVExSUFQcmh0OEh1TlhEOGFlMVU4NEp5TjJ2IiwiYW1yIjpbInB3ZCIsInJzYSJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiNWU3YTgwMDMtN2NmNS00ZGU3LTg4YmItY2E5YzI2YjBhMmU3IiwiZmFtaWx5X25hbWUiOiJDQVNUUk8gVE9SUkVTIiwiZ2l2ZW5fbmFtZSI6IkNBUkxPUyBKT1NVRSIsImlwYWRkciI6IjE4MS4xMTUuNTkuMjciLCJuYW1lIjoiQ0FSTE9TIEpPU1VFIENBU1RSTyBUT1JSRVMiLCJvaWQiOiJkNGNhMGM2My01ODUwLTQ1ZmMtODQwYi0wZTQ5ZDg2ZmRjN2EiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNzc4MTEzMjk1LTIwMjA1ODMzODQtMTMyMDE3OTAtMzU0Nzk4IiwicHVpZCI6IjEwMDM3RkZFOUNGOTMwQTEiLCJyaCI6IjAuQVZrQWtEbXBNN1NMblV1MElrLUlVU0Y5ZmdrQUFBQUFBQUFBd0FBQUFBQUFBQUJaQU53LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Ii13cVZVUjhTaDZRakpCdHNFVGtzWkNnRnpVWjljUFUwdkQ0LVdCczdPM2ciLCJ0aWQiOiIzM2E5Mzk5MC04YmI0LTRiOWQtYjQyMi00Zjg4NTEyMTdkN2UiLCJ1bmlxdWVfbmFtZSI6ImNjYXN0cm90QHVuYWguaG4iLCJ1cG4iOiJjY2FzdHJvdEB1bmFoLmhuIiwidXRpIjoiR3YydXM5cXROMDI5c2dJdHMzcFZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.JvsxJI5L2ekmiRbnK4D7aDFMbrXlCZT9x6vG5g91dKSkDkOy2BI37plzEHbI9PCPmwoNKoxKG9vYJ7MJAODVV_KXBK4kAOhPCbOYfz-9HFnaxqmEeew2ZHOX6lBWonsOnV7EZvVMXC4B3UBpGcX1LHvhUh2zXfVeu5o4na8XTG1uV-8OI5B4yWkuC6YrO8_jNtqZclmZhR64KCaN7Y6VWQ8WLBphRYz7dWj2LFfuf5KwmifdpflAFJOrvi9UlgdBG1klmu9gGNqz7BIKxaZ18dApwCVCJYXdYqTV9NBfzFYEtEK7g5BEa1yyd1F3djVkBWpr43ec32qR_3K0TlkzFQ',
                            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
                            settings: {
                                panes: {
                                    filters: {
                                        expanded: false,
                                        visible: true
                                    }
                                },
                            }
                        }}

                        eventHandlers={
                            new Map([
                                ['loaded', function () { console.log('Report loaded'); }],
                                ['rendered', function () { console.log('Report rendered'); }],
                                ['error', function (event) { console.log(event.detail); }],
                                ['visualClicked', () => console.log('visual clicked')],
                                ['pageChanged', (event) => console.log(event)],
                            ])
                        }

                        cssClassName={"Embed-container"}

                        getEmbeddedComponent={(embeddedReport) => {
                            window.report = embeddedReport;
                        }}
                    />
                </header>
            </div>
        </>)
}
