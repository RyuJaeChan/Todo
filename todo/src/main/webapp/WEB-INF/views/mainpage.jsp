<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta name="description" content="네이버 예약, 네이버 예약이 연동된 곳 어디서나 바로 예약하고, 네이버 예약 홈(나의예약)에서 모두 관리할 수 있습니다.">
    <title>Scheduler</title>
    <link href="./css/style.css" rel="stylesheet">
</head>

<body>
    <header class="header">
        <div class="title">
            <span>Todo List</span>
        </div>
        <div class="date_wrap">
            <span class="date"> 2018년 11월 - 12월</span>
            <div class="button_wrap">
                <div class="prevButton"><span> <!--◀--> </span></div>
                <div class="nextButton"><span> <!--▶--> </span></div>
            </div>
        </div>
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
                <div class="head">
                    <span>모든 일정</span>
                </div>
                <div class="list">

                </div>
            </div>
            <!--div class="today">
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
            </div-->
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

    <div class="background"></div>
    <div class="register_form">
        <img class="close_button" src="./img/close.png" width="24" height="24">
        <div class="from_wrap">
            <div class="title_bar">
                <span>입력</span>
            </div>
            <div class="form">
                <input type="hidden" class="id" value="">
                <div>
                    <span>제목</span>
                </div>
                <div>
                    <input type="text" class="title" maxlength="32" name="title" placeholder="제목" required>
                </div>
                <div>
                    <span>날짜</span>
                </div>
                <div>
                    <input type="text" class="date_text" maxlength="32" name="date" placeholder="yyyy-mm-dd" required>
                </div>
                <div>
                    <span>내용</span>
                </div>
                <div>
                    <textarea class="description"></textarea>
                </div>
                <div>
                    <span>우선 순위를 선택하세요.</span>
                </div>
                <div class="checkbox">
                    <ul>
                        <li><input type="radio" name="priority" value="1" checked="true" required>1 </input> </li>
                        <li><input type="radio" name="priority" value="2">2</input></li>
                        <li><input type="radio" name="priority" value="3">3</input></li>
                        <li><input type="radio" name="priority" value="4">4</input></li>
                        <li><input type="radio" name="priority" value="5">5</input></li>
                    </ul>
                </div>
            </div>
            <div class="button_area">
                <button class="submit_button">SUBMIT</button>
            </div>
        </div>
    </div>
    <div class="alert_form">
            <img class="close_button" src="./img/close.png" width="24" height="24">
            <div class="form_wrap">
                <div class="title_bar">
                    <span>종료된 일정</span>
                </div>
                <div class="list">
    
                </div>
            </div>
    </div>
    <div class="info_form">
        <img class="close_button" src="./img/close.png" width="24" height="24">
        <div class="form_wrap">
            <div class="title_bar">
                <span>상세 정보</span>
            </div>
            <div class="form">
                <input type="hidden" class="id" value="">
                <div>
                    제목 : <span class="title">제목</span>
                </div>
                <div>
                    <span>날짜 : </span> <span class="date">2018-11-05</span>
                </div>
                <div>
                    <span>우선 순위 : </span><span class="priority">3</span>
                </div>
                <div>
                    <span>내용</span>
                </div>
                <div>
                    <span class="description">이러저러그러한거</span>
                </div>
            </div>
            <div class="button_area">
                <button class="modify_button">수정</button>
            </div>
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
        <div class="date_element id_{id}">
            <p class="date">{val}</p>
            <div class="todo_list">
            </div>
        </div>
    </script>
    <script type="template" id="scheduleTemplate">
            <div class="todo">
                <input type="hidden" class="id" value="{id}">
               {title}
            </div>
    </script>
    <script type="template" id="listTemplate">
            <div class="element" data-id="{id}">
                {title}
            </div>
    </script>

    <script src="./js/common/ajax.js?ver=1"></script>
    <script src="./js/common/util.js?ver=1"></script>
    <script src="./js/popup.js?ver=1"></script>
    <script src="./js/calendar.js?ver=1"></script>
    <script src="./js/main.js?ver=1"></script>
</body>

</html>