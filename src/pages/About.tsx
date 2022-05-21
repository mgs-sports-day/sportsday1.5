import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../components/Breadcrumb';

export default function About() {
    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
            ]}
            current='About'
        />

        <h1>
            <FontAwesomeIcon icon={faInfoCircle}/> About MGS Sports Day
        </h1>

        <p>
            This website was developed to allow spectators of the Manchester Grammar School's annual Senior Sports Day
            to view results, events, and competitors in these events.

            It is a collaborative effort between the Computer Science and PE departments of the school, the staff
            responsible in each department being Mr D Millington and Mr T Grainger respectively.

            It is hoped that students, parents and staff will find this website beneficial.

            It works by fetching score and competitor data from a Google Drive spreadsheet, and displaying it in an
            easy-to-use and clear fashion.
        </p>

        <h2>
            How it works
        </h2>
        <p>
            This website is powered by React and Google Sheets.

            We query a Google Sheet with lots of live data in it every time a page is loaded, using the Google Sheets
            API v4.

            All calculation of scores and results occurs in Google sheets; not on this website. We then use various
            algorithms to compile the data into neatly laid-out tables, cross-referencing each other for easy
            navigation.

            The website is styled using custom SCSS and is tested mobile-first, ensuring it works well on all screen
            sizes. The compiled JavaScript files are arranged in highly-compressed per-page bundles, ensuring the site
            loads quickly on phones and doesn't use up 'too much data'.
        </p>

        <h2>
            Development credits
        </h2>
        <p>
            This website was developed by Theodore Tucker, Pal Kerecsenyi, and Geza Kerecsenyi, students of the
            Manchester Grammar School, under the guidance of Mr D Millington, the Head of Computer Science. This project
            is open source, and source code is available at the GitHub repository here:&nbsp;
            <a
                href='https://github.com/mgs-sports-day/sportsday1.5'
                target='_blank'
                rel='noreferrer'
            >
                https://github.com/mgs-sports-day/sportsday1.5
            </a>.

            The site is licensed under the MIT license, and thus no warranty whatsoever is provided.
        </p>

        <p>
            The website uses the following open-source software (NPM package names shown in <code>monospace</code>):

            <ul>
                <li>
                    Font Awesome for rendering icons and making the UI look pretty<br/>
                    Font Awesome Free License
                </li>
                <li>
                    Browserify <code>events</code> for using the Node.JS API in-browser to synchronise periodic reloading of data<br/>
                    MIT License
                </li>
                <li>
                    <code>lodash</code> for some additional data manipulation at the rendering stage<br/>
                    MIT License
                </li>
                <li>
                    Facebook <code>react</code> and <code>react-dom</code> for rendering the site itself<br/>
                    MIT License
                </li>
                <li>
                    Remix <code>react-router-dom</code> for managing frontend routing<br/>
                    MIT License
                </li>
                <li>
                    Microsoft <code>typescript</code> for compiling source code<br/>
                    MIT License
                </li>
                <li>
                    <code>sass</code> for compiling stylesheets<br/>
                    MIT License
                </li>
                <li>
                    <code>socket.io</code> for communicating with the analytics server<br/>
                    MIT License
                </li>
                <li>
                    <code>axios</code> for making GET requests to the Google Sheets API<br/>
                    MIT License
                </li>
                <li>
                    <code>md5</code> for generating hashes to use with the site's caching system<br/>
                    BSD-3-Clause License
                </li>
                <li>
                    <code>underscore</code> for data manipulation used throughout the site's Google Sheets API wrapper<br/>
                    MIT License
                </li>
            </ul>
        </p>

        <h2>
            Privacy
        </h2>
        <p>
            <strong>This site collects no personal data about its users.</strong> We use a&nbsp;
            <a
                href='https://replit.com/@palk/SportsDayAnalytics#index.js'
                target='_blank'
                rel='noreferrer'
            >
                tiny custom analytics system
            </a> with the sole purpose of counting real-time users, their browsers, their operating systems, and the
            pages they are visiting. We use this data to see how people interact with the site and thus what we need to
            improve on for next year.
        </p>
        <p>
            The site does not store cookies on your device. It stores cached data from the spreadsheet in your
            browser's <code>localStorage</code>. This information cannot be accessed by other websites and is used to
            improve the site's performance and reduce the chance of requests failing due to Google Sheets' rate
            limiting system.
        </p>
        <p>
            All results and records data on the site is covered under the school's Privacy Notice, which can be accessed
            here:&nbsp;
            <a
                href='https://www.mgs.org/541/our-policies'
                target='_blank'
                rel='noreferrer'
            >
                https://www.mgs.org/541/our-policies
            </a>.

            Where names of students are collected, only the first name and last initial are published, in the interests
            of privacy.
        </p>

        <h2>Contact</h2>
        <p>
            Please direct all enquiries to Mr Daniel Millington, Head of Computer Science at the Manchester Grammar School.<br />
            Email: <a href="mailto:d.e.millington@mgs.org">d.e.millington@mgs.org</a><br />
            Telephone: (+44) 0161 224 7201 ext. 467
        </p>
    </>;
}
