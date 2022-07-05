"use strict";(self.webpackChunksportsday1_5=self.webpackChunksportsday1_5||[]).push([[679,950],{3378:function(r,e,n){n.d(e,{Z:function(){return c}});var t={breadcrumb:"Breadcrumb_breadcrumb__qk236"},a=n(3504),o=n(184);function c(r){var e=r.paths,n=r.current;return(0,o.jsxs)("div",{className:t.breadcrumb,children:[e.map((function(r){return(0,o.jsx)(a.rU,{to:r.link,children:r.name},r.link)})),(0,o.jsx)("p",{className:t.last,children:n})]})}},8110:function(r,e,n){n.d(e,{O:function(){return u},Z:function(){return i}});var t=n(885),a=n(2791),o={container:"TabSwitcher_container__G4mUd",tabSelect:"TabSwitcher_tabSelect__hD89l",active:"TabSwitcher_active__J2tLC"},c=n(184);function u(r){var e=r.children;return(0,c.jsx)(c.Fragment,{children:e})}function i(r){var e=r.children,n=r.initialValue,u=r.onChange,i=function(r){var e;return null!==(e=r.props.dataKey)&&void 0!==e?e:r.props.label},l=e&&(e.hasOwnProperty("length")?e:[e]),s=(0,a.useState)(l?null!==n&&void 0!==n?n:i(l[0]):null),d=(0,t.Z)(s,2),v=d[0],h=d[1],f=(0,a.useCallback)((function(r){u&&u(r),h(r)}),[u]);return(0,c.jsxs)("div",{className:o.container,children:[(0,c.jsx)("div",{className:o.tabSelect,children:null===l||void 0===l?void 0:l.map((function(r){return(0,c.jsx)("button",{className:v===i(r)?o.active:void 0,onClick:function(){return f(i(r))},children:r.props.label},i(r))}))}),(0,c.jsx)("div",{className:o.tabData,children:null===l||void 0===l?void 0:l.filter((function(r){return i(r)===v}))[0]})]})}},1950:function(r,e,n){n.r(e),n.d(e,{default:function(){return v},yearGroups:function(){return d}});var t=n(885),a=n(2766),o=n(5031),c=n(3378),u=n(2180),i=n(8765),l=n(8110),s=n(184),d=[7,8,9,10];function v(){var r=(0,a.W)((function(r){return r.getSummaryStandings()})),e=(0,t.Z)(r,1)[0],n=(0,o.Ov)(),v=(0,t.Z)(n,2),h=v[0],f=v[1];return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c.Z,{paths:[{name:"Home",link:"/"}],current:"Forms"}),(0,s.jsx)("h1",{children:"All forms"}),(0,s.jsx)(l.Z,{initialValue:h,onChange:f,children:d.map((function(r){return(0,s.jsx)(l.O,{label:"Year ".concat(r),dataKey:r,children:e&&(0,s.jsx)(i.i,{header:[{text:"Form"},{text:"Year ".concat(r," rank"),sortable:!0},{text:"School rank",sortable:!0},{text:"Total points"}],children:e.filter((function(e){return e.year===r})).map((function(r){return(0,s.jsx)(i.S,{columns:[(0,s.jsx)(u.Z,{form:r}),{value:r.yearPos,autoHighlight:!0},{value:r.schoolPos,autoHighlight:!0},{value:r.points}]},(0,o.Xv)(r))}))})},r)}))})]})}},1679:function(r,e,n){n.r(e),n.d(e,{default:function(){return m}});var t=n(8683),a=n(2982),o=n(885),c=n(2766),u=n(5031),i=n(3378),l=n(3504),s=n(8765),d=n(184);function v(r){var e=r.records;return(0,d.jsx)(d.Fragment,{children:e&&(0,d.jsx)(s.i,{header:[{text:"Event"},{text:"Record year",sortable:!0},{text:"Record score",sortable:!0},{text:"2022 best score",sortable:!0},{text:"2022 champion"}],children:e.map((function(r){return(0,d.jsx)(s.S,{columns:[(0,d.jsx)(l.rU,{to:"/events/".concat(r.event),children:(0,u.eb)(r.event)}),{value:r.standingYear},{value:"".concat(r.standingScore).concat((0,u.N)(r.units)),sortValue:r.standingScore},{value:r.currentScore?"".concat(r.currentScore).concat((0,u.N)(r.units)):"",sortValue:r.currentScore||-100},{value:r.currentHolder}]},r.event)}))})})}var h=n(8110),f=n(1950);function g(r){var e=r.year,n=(0,c.W)((function(r){return r.getYearGroupRecords(e)}))[0];return(0,d.jsx)(v,{records:n})}function p(){var r,e=[(0,c.W)((function(r){return r.getYearGroupRecords(7)}))[0],(0,c.W)((function(r){return r.getYearGroupRecords(8)}))[0],(0,c.W)((function(r){return r.getYearGroupRecords(9)}))[0],(0,c.W)((function(r){return r.getYearGroupRecords(10)}))[0]],n=function(r,e,n){return r.map((function(r){return null===r||void 0===r?void 0:r.filter((function(r){return r.event===e.event}))[0]})).map((function(r,e){return[r,e,r&&r[n]]})).filter((function(r){return r[2]})).sort((function(r,n){return n[2]&&r[2]?"second"===e.units?r[2]-n[2]:n[2]-r[2]:1e3}))[0]},t=null===(r=e[0])||void 0===r?void 0:r.map((function(r){var t,a,o,c,u=n(e,r,"currentScore"),i=n(e,r,"standingScore");return{doScore:r.doScore,event:r.event,units:r.units,standingHolder:i&&i[0]?"".concat(i[0].standingHolder," (y").concat(f.yearGroups[i[1]],")"):"",standingYear:i&&(null===(t=i[0])||void 0===t?void 0:t.standingYear)||2021,standingScore:i&&(null===(a=i[0])||void 0===a?void 0:a.standingScore)||0,currentHolder:u&&u[0]?"".concat(u[0].standingHolder," (y").concat(f.yearGroups[u[1]],")"):"",currentYear:u&&(null===(o=u[0])||void 0===o?void 0:o.currentYear)||2021,currentScore:u&&(null===(c=u[0])||void 0===c?void 0:c.currentScore)||0}}));return(0,d.jsx)(v,{records:t})}function m(){var r=(0,u.Ov)(),e=(0,o.Z)(r,2),n=e[0],l=e[1],v=(0,c.W)((function(r){return r.getRecordsSummaryStats()})),m=(0,o.Z)(v,1)[0];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.Z,{paths:[{name:"Home",link:"/"}],current:"Records"}),(0,d.jsx)("h1",{children:"Records"}),(0,d.jsx)(h.Z,{initialValue:n,onChange:l,children:[].concat((0,a.Z)(f.yearGroups),["All"]).map((function(r){return(0,d.jsx)(h.O,{label:"All"===r?r:"Year ".concat(r),dataKey:r,children:"All"===r?(0,d.jsx)(p,{}):(0,d.jsx)(g,{year:r})},r)}))}),void 0!==m&&(0,d.jsx)(s.i,{children:m&&m.map((function(r){return(0,d.jsx)(s.S,{columns:[{value:r.year,isHeader:!0},(0,t.Z)({value:"".concat(r.recordsBroken," broken"),autoHighlight:"All year groups"!==r.year,isHeader:"All year groups"===r.year},"All year groups"===r.year?{}:{highlightValue:(0,u.OJ)(m.filter((function(r){return"All year groups"!==r.year})),"year",r.year,"recordsBroken")}),(0,t.Z)({value:"".concat(r.recordsEqualled," equalled"),autoHighlight:"All year groups"!==r.year,isHeader:"All year groups"===r.year},"All year groups"===r.year?{}:{highlightValue:(0,u.OJ)(m.filter((function(r){return"All year groups"!==r.year})),"year",r.year,"recordsEqualled")})]},r.year)}))})]})}}}]);
//# sourceMappingURL=679.690fbe96.chunk.js.map