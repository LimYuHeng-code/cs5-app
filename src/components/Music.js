import React from 'react';

function Music() {
return (
    <div className="content">
        <h2>Music at JavaJam</h2>
        <p>
        The first Friday night each month at JavaJam is a special night. Join us from 8pm to 11pm for some music you don't want to miss.
        </p>
        <table border="0" id="centered">
        <tbody>
            <tr id="table-row-1">
            <td colSpan="2" id="table-colspan">JANUARY</td>
            </tr>
            <tr>
            <td headers="artwork" id="table-leftcol">
                <img src="/taylor.jpg" id="floatleft" alt="Taylor" width="80" height="80" />
            </td>
            <td headers="description" id="table-rightcol">
                Taylor Swift entertains with her melodic pop style.
                <br />
                <strong>CDs are available now!</strong>
                <br />
                <audio controls>
                <source src="/22.mp3" type="audio/mpeg" />
                </audio>
            </td>
            </tr>
            <tr id="table-row-1">
            <td colSpan="2" id="table-colspan">FEBRUARY</td>
            </tr>
            <tr>
            <td headers="artwork" id="table-leftcol">
                <img src="/shawn mendes.jpg" id="floatleft" alt="Shawn Mendes" width="80" height="80" />
            </td>
            <td headers="description" id="table-rightcol">
                Shawn Mendes is back from his tour.
                <br />
                New songs. New stories.
                <br />
                <strong>CDs are available now!</strong>
                <br />
                <audio controls>
                <source src="/mercy.mp3" type="audio/mpeg" />
                </audio>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
    );
}

export default Music;
