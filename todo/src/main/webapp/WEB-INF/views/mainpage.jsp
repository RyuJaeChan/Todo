<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta name="description" content="네이버 예약, 네이버 예약이 연동된 곳 어디서나 바로 예약하고, 네이버 예약 홈(나의예약)에서 모두 관리할 수 있습니다.">
    <title>Web Scheduler</title>
    <!-- link href="./css/style.css" rel="stylesheet" -->
    <link href="./css/style.css" rel="stylesheet">

</head>

<body>
    <header class="header">
        <div class="title">
            Todo
        </div>
        <div class="date_wrap">
            <span class="date"> 2018년 11월 - 12월</span>
            <div class="button_wrap">
                <div class="prevButton"><span> ◀ </span></div>
                <div class="nextButton"><span> ▶ </span></div>
            </div>
        </div>
        <button class="test"> TEst Buttnon </button>
    </header>

    <div class="wrap">
        <div class="info_area">
            <div class="cal">
                <div class="date">
                    <span class="cal_date"> </span>
                    <div class="button_wrap">
                        <div class="prevButton"><span> ◀ </span></div>
                        <div class="nextButton"><span> ▶ </span></div>
                    </div>
                </div>
                <table class="calendar">
                    <tbody>
                        <tr>
                            <td>일</td>
                            <td>월</td>
                            <td>화</td>
                            <td>수</td>
                            <td>목</td>
                            <td>금</td>
                            <td>토</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="all">
                <p>All</p>
                <ul>
                    <li>놀기</li>
                </ul>
            </div>
            <div class="today">
                <p>today</p>
                <ul>
                    <li>먹기</li>
                </ul>
            </div>
            <div class="upcoming">
                <p>upcoming</p>
                <ul>
                    <li>기타등등</li>
                </ul>
            </div>
        </div>
        <div class="cal_area">
            <table class="calendar">
                <tbody>
                    <tr class="day_row">
                        <td>일</td>
                        <td>월</td>
                        <td>화</td>
                        <td>수</td>
                        <td>목</td>
                        <td>금</td>
                        <td>토</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


    <!--
        <div class="date_element">
            <p class="date">11</p>
            <div class="todo_list">
                <div class="todo">111</div>
                <div class="todo">222</div>
                <div class="todo">333</div>
                <div class="todo">444</div>
                <div class="todo">555</div>
                <div class="todo">666</div>
                <div class="more">더보기</div>
            </div>
        </div>
    -->
    <script type="template" id="dateTemplete">
        <div class="date_element">
            <p class="date">{val}</p>
            <div class="todo_list">
            </div>
        </div>
    </script>


    <script src="./js/common/ajax.js?ver=1"></script>
    <script src="./js/common/util.js?ver=1"></script>
    <script src="./js/calendar.js?ver=1"></script>
    <script src="./js/main.js?ver=1"></script>
</body>

</html>