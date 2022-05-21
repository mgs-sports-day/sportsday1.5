"use strict";(self.webpackChunksportsday1_5=self.webpackChunksportsday1_5||[]).push([[26],{3378:function(e,s,r){r.d(s,{Z:function(){return o}});var t={breadcrumb:"Breadcrumb_breadcrumb__qk236"},i=r(3504),n=r(184);function o(e){var s=e.paths,r=e.current;return(0,n.jsxs)("div",{className:t.breadcrumb,children:[s.map((function(e){return(0,n.jsx)(i.rU,{to:e.link,children:e.name},e.link)})),(0,n.jsx)("p",{className:t.last,children:r})]})}},2026:function(e,s,r){r.r(s),r.d(s,{default:function(){return a}});var t=r(4483),i=r(3174),n=r(3378),o=r(184);function a(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.Z,{paths:[{name:"Home",link:"/"}],current:"About"}),(0,o.jsxs)("h1",{children:[(0,o.jsx)(t.G,{icon:i.sqG})," About MGS Sports Day"]}),(0,o.jsx)("p",{children:"This website was developed to allow spectators of the Manchester Grammar School's annual Senior Sports Day to view results, events, and competitors in these events. It is a collaborative effort between the Computer Science and PE departments of the school, the staff responsible in each department being Mr D Millington and Mr T Grainger respectively. It is hoped that students, parents and staff will find this website beneficial. It works by fetching score and competitor data from a Google Drive spreadsheet, and displaying it in an easy-to-use and clear fashion."}),(0,o.jsx)("h2",{children:"How it works"}),(0,o.jsx)("p",{children:"This website is powered by React and Google Sheets. We query a Google Sheet with lots of live data in it every time a page is loaded, using the Google Sheets API v4. All calculation of scores and results occurs in Google sheets; not on this website. We then use various algorithms to compile the data into neatly laid-out tables, cross-referencing each other for easy navigation. The website is styled using custom SCSS and is tested mobile-first, ensuring it works well on all screen sizes. The compiled JavaScript files are arranged in highly-compressed per-page bundles, ensuring the site loads quickly on phones and doesn't use up 'too much data'."}),(0,o.jsx)("h2",{children:"Development credits"}),(0,o.jsxs)("p",{children:["This website was developed by Theodore Tucker, Pal Kerecsenyi, and Geza Kerecsenyi, students of the Manchester Grammar School, under the guidance of Mr D Millington, the Head of Computer Science. This project is open source, and source code is available at the GitHub repository here:\xa0",(0,o.jsx)("a",{href:"https://github.com/mgs-sports-day/sportsday1.5",target:"_blank",rel:"noreferrer",children:"https://github.com/mgs-sports-day/sportsday1.5"}),". The site is licensed under the MIT license, and thus no warranty whatsoever is provided."]}),(0,o.jsxs)("p",{children:["The website uses the following open-source software (NPM package names shown in ",(0,o.jsx)("code",{children:"monospace"}),"):",(0,o.jsxs)("ul",{children:[(0,o.jsxs)("li",{children:["Font Awesome for rendering icons and making the UI look pretty",(0,o.jsx)("br",{}),"Font Awesome Free License"]}),(0,o.jsxs)("li",{children:["Browserify ",(0,o.jsx)("code",{children:"events"})," for using the Node.JS API in-browser to synchronise periodic reloading of data",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("code",{children:"lodash"})," for some additional data manipulation at the rendering stage",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:["Facebook ",(0,o.jsx)("code",{children:"react"})," and ",(0,o.jsx)("code",{children:"react-dom"})," for rendering the site itself",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:["Remix ",(0,o.jsx)("code",{children:"react-router-dom"})," for managing frontend routing",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:["Microsoft ",(0,o.jsx)("code",{children:"typescript"})," for compiling source code",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("code",{children:"sass"})," for compiling stylesheets",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("code",{children:"socket.io"})," for communicating with the analytics server",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("code",{children:"axios"})," for making GET requests to the Google Sheets API",(0,o.jsx)("br",{}),"MIT License"]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("code",{children:"md5"})," for generating hashes to use with the site's caching system",(0,o.jsx)("br",{}),"BSD-3-Clause License"]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("code",{children:"underscore"})," for data manipulation used throughout the site's Google Sheets API wrapper",(0,o.jsx)("br",{}),"MIT License"]})]})]}),(0,o.jsx)("h2",{children:"Privacy"}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"This site collects no personal data about its users."})," We use a\xa0",(0,o.jsx)("a",{href:"https://replit.com/@palk/SportsDayAnalytics#index.js",target:"_blank",rel:"noreferrer",children:"tiny custom analytics system"})," with the sole purpose of counting real-time users, their browsers, their operating systems, and the pages they are visiting. We use this data to see how people interact with the site and thus what we need to improve on for next year."]}),(0,o.jsxs)("p",{children:["The site does not store cookies on your device. It stores cached data from the spreadsheet in your browser's ",(0,o.jsx)("code",{children:"localStorage"}),". This information cannot be accessed by other websites and is used to improve the site's performance and reduce the chance of requests failing due to Google Sheets' rate limiting system."]}),(0,o.jsxs)("p",{children:["All results and records data on the site is covered under the school's Privacy Notice, which can be accessed here:\xa0",(0,o.jsx)("a",{href:"https://www.mgs.org/541/our-policies",target:"_blank",rel:"noreferrer",children:"https://www.mgs.org/541/our-policies"}),". Where names of students are collected, only the first name and last initial are published, in the interests of privacy."]}),(0,o.jsx)("h2",{children:"Contact"}),(0,o.jsxs)("p",{children:["Please direct all enquiries to Mr Daniel Millington, Head of Computer Science at the Manchester Grammar School.",(0,o.jsx)("br",{}),"Email: ",(0,o.jsx)("a",{href:"mailto:d.e.millington@mgs.org",children:"d.e.millington@mgs.org"}),(0,o.jsx)("br",{}),"Telephone: (+44) 0161 224 7201 ext. 467"]})]})}}}]);
//# sourceMappingURL=26.7b583290.chunk.js.map