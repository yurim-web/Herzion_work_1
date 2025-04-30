/**
 * 상품상세 Q&A
 */
$(function(){
    $('.xans-product-qna a').on('click', function(e) {
        e.preventDefault();

        var no = $(this).attr('href').replace(/(\S*)[?&]no=(\d+)(\S*)/g, '$2');
        var $obj = $('#product-qna-read_'+no);

        //로드된 엘리먼트 존재 체크
        if ($obj.length > 0) {
            if ($obj.css('display') =='none') {
                $obj.show();
            } else {
                $obj.hide();
            }
            return;
        }

        QNA.getReadData($(this));
    });

    // qna 탭 바로 활성화처리
   var href = document.location.href.split('#')[1];
    var winWidth = window.innerWidth;
    if (winWidth < 1026 && href == 'use_qna' || href == 'prdQnA') {
        $('a[name^="use_qna"]').trigger('click');
    }
});

var PARENT = '';

var OPEN_QNA = '';

var QNA = {
    getReadData : function(obj, eType)
    {
        if (obj != undefined) {
            PARENT = obj;
            var sHref = obj.attr('href');
            var pNode = obj.parents('tr');
            var pass_check = '&pass_check=F';
        } else {
            var sHref = PARENT.attr('href');
            var pNode = PARENT.parents('tr');
            var pass_check = '&pass_check=T';
        }

        var sQuery = sHref.split('?');

        var sQueryNo = sQuery[1].split('=');
        if (OPEN_QNA == sQueryNo[1]) {
            $('#product-qna-read').remove();
            OPEN_QNA = '';
            return false;
        } else {
            OPEN_QNA = sQueryNo[1];
        }

        $.ajax({
            url : '/exec/front/board/product/6?'+sQuery[1]+pass_check,
            dataType: 'json',
            success: function(data) {
                $('#product-qna-read').remove();

                var sPath = document.location.pathname;
                var sPattern = /^\/product\/(.+)\/([0-9]+)(\/.*)/;
                var aMatchResult = sPath.match(sPattern);

                if (aMatchResult) {
                    var iProductNo = aMatchResult[2];
                } else {
                    var iProductNo = getQueryString('product_no');
                }

                var aHtml = [];

                //읽기 권한 체크
                if (false === data.read_auth && eType == undefined) {
                    alert(decodeURIComponent(data.alertMSG));

                    //로그인페이지 이동
                    if (data.returnUrl != undefined) {
                        location.replace("/member/login.html?returnUrl=" + data.returnUrl);
                    }
                    return false;
                }

                if (data.is_secret == true) {
                    // 비밀글 비밀번호 입력 폼
                    aHtml.push('<form name="SecretForm_6" id="SecretForm_6">');
                    aHtml.push('<input type="text" name="a" style="display:none;">');
                    aHtml.push('<div class="view secret">');
                    aHtml.push('<p class="alert">이 글은 비밀글입니다. 비밀번호를 입력하여 주세요.</p>');
                    aHtml.push('<p><input type="password" id="secure_password" name="secure_password" onkeydown="if (event.keyCode == 13) '+data.action_pass_submit+'"> <input type="button" value="확인" onclick="'+data.action_pass_submit+'" class="btnNormal"></p>');
                    aHtml.push('</div>');
                    aHtml.push('</form>');
                } else {
                    // 글 내용
                    if (data.read['content_image'] != null) {
                        var sImg = data.read['content_image'];
                    } else {
                        var sImg = '';
                    }

                    aHtml.push('<div class="view '+ data.read['block_content_class'] +'">');
					aHtml.push('<div id="ec-ucc-media-box-'+ data.read['no'] +'"></div>');
                    aHtml.push('<p class="attach">'+sImg+'</p>');
                    aHtml.push('<p>'+data.read['content']+'</p>');
                    aHtml.push('<div class="ec-base-button">');
                    if (data.comment != undefined) {
                        aHtml.push('<div class="gLeft"><a href="#none" class="btnNormal sizeS" onclick="QNA.comment_view('+data.read['no']+');">댓글보기 <em>'+data.read['comment_count']+'</em><i aria-hidden="true" class="icon icoArrowBottom"></i></a><a href="#none" class="btnNormal sizeS" onclick="QNA.comment_write(this);">쓰기</a>');
                        if (data.write_auth == true) {
                            aHtml.push('<a href="#none" onclick="EC_PRODUCT_FRONT_BOARD_QNA.modify(' + data.no + ', ' + iProductNo + ');" class="btnNormal sizeS">수정</a>');
                        }
						aHtml.push('</div>');
                    }
					aHtml.push('<div class="gRight">');
					aHtml.push('<a href="#none" class="btnNormal sizeS ' + data.read['report_open_btn'] +'" onclick="'+ data.read['report_open_layer_action'] +'">신고</a> ');
					aHtml.push('<a href="#none" class="btnNormal sizeS '+ data.read['block_request_btn'] +'" onclick="'+ data.read['block_action'] +'">차단</a> ');
					aHtml.push('<a href="#none" class="btnNormal sizeS '+ data.read['unblock_request_btn'] +'" onclick="'+ data.read['unblock_action'] +'">차단해제</a> ');
					aHtml.push('</div>');
                    aHtml.push('</div>');
                    aHtml.push('</div>');

                    // 댓글리스트
                    if (data.comment != undefined && data.comment.length != undefined) {
                        aHtml.push('<ul class="boardComment" id="commentList_'+data.read['no']+'" style="display:none;">');
                        for (var i=0; data.comment.length > i; i++) {
                            //댓글리스트
                            if (data.comment[i]['comment_reply_css'] == undefined) {
                                aHtml.push('<li id="'+data.comment[i]['comment_reply_id']+'">');
                                aHtml.push('<div class="commentInfo">');
                                aHtml.push('<strong class="name">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</strong>');
                                aHtml.push('<span class="date">'+data.comment[i]['comment_write_date']+'</span>');
                                aHtml.push('<span class="grade '+data.use_point+'"><img src="//img.echosting.cafe24.com/skin/skin/board/icon-star-rating'+data.comment[i]['comment_point_count']+'.svg" alt="'+data.comment[i]['comment_point_count']+'점" /></span>');
                                aHtml.push('</div>');
                                aHtml.push('<p class="comment">'+data.comment[i]['comment_content']+'</p>');
                                if (data.comment[i]['comment_reply_display'] == true) {
                                    aHtml.push('<div class="ec-base-button">');
                                    aHtml.push('<div class="gLeft"><a href="#none" class="btnNormal sizeS" onclick="QNA.comment_reply_view('+data.comment[i]['comment_no']+')">댓글의 댓글 <em>'+data.comment[i]['comment_reply_count']+'</em><i aria-hidden="true" class="icon icoArrowBottom"></i></a></div>');
                                    aHtml.push('<div class="gRight"><a href="#none" class="btnNormal sizeS" onclick="'+data.comment[i]['action_comment_reply_new']+'">쓰기</a></div>');
                                    aHtml.push('</div>');
                                }
                                aHtml.push('</li>');
                            } else {
                                //댓글의 댓글리스트
                                aHtml.push('<li class="replyArea" style="display:none;" id="'+data.comment[i]['comment_reply_id']+'">');
                                aHtml.push('<div class="commentInfo">');
                                aHtml.push('<strong class="name">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</strong>');
                                aHtml.push('<span class="date">'+data.comment[i]['comment_write_date']+'</span>');
                                aHtml.push('</div>');
                                aHtml.push('<p class="comment">'+data.comment[i]['comment_content']+'</p>');
                                aHtml.push('</li>');
                            }
                        }
                        aHtml.push('</ul>');
                    }

                    // 댓글쓰기
                    if (data.comment_write != undefined) {
                        aHtml.push('<form name="commentWriteForm_6'+data.key+'" id="commentWriteForm_6'+data.key+'" style="display:none;">');
                        aHtml.push('<div class="memoCont">');
                        aHtml.push('<div class="writeForm">');
                        aHtml.push('<div class="commentForm">' +data.comment_write['comment']+ '</div>');
                        aHtml.push('<div class="infoForm"><p class="name"><span class="label">이름</span>' +data.comment_write['comment_name']+ '</p><p class="password"><span class="label">비밀번호</span>' +data.comment_write['comment_password']+ '</p></div>');
                        aHtml.push('<p class="ec-base-help ' +data.comment_write['password_rule_help_display_class']+ '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
                        aHtml.push('<div class="ctrl">');
                        if (data.comment_write['comment_secret_display'] == true) {
                            aHtml.push('<label class="secret">'+data.comment_write['secure']+' 비밀댓글</label>');
                        }
                        aHtml.push('<div class="button"><a href="#none" onclick="' +data.comment_write['action_comment_insert']+ '" class="btnSubmit sizeM">등록</a></div>');
                        aHtml.push('</div>');
                        aHtml.push('</div>');
                        aHtml.push('<div class="byteRating"><p class="rating ' +data.comment_write['use_point']+ '">' +data.comment_write['comment_point']+ '</p><p class="byte ' +data.comment_write['use_comment_size']+ '">/ byte</p></div>');
                        aHtml.push('<div class="captcha ' +data.comment_write['use_captcha']+ '"><span class="img"></span><div class="form">' +data.comment_write['captcha_image']+data.comment_write['captcha_refresh']+data.comment_write['captcha']+ '<p class="ec-base-help">왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p></div></div>');
                        aHtml.push('</div>');
                        aHtml.push('</form>');
                    }

                    if (data.comment_reply != undefined) {
                        aHtml.push('<form name="commentReplyWriteForm_6'+data.key+'" id="commentReplyWriteForm_6'+data.key+'" style="display:none">');
                        aHtml.push('<div class="memoCont reply">');
                        aHtml.push('<div class="writeForm">');
                        aHtml.push('<div class="commentForm">' +data.comment_reply['comment']+ '</div>');
                        aHtml.push('<div class="infoForm"><p class="name"><span class="label">이름</span>' +data.comment_reply['comment_name']+ '</p><p class="password"><span class="label">비밀번호</span>' +data.comment_reply['comment_password']+ '</p></div>');
                        aHtml.push('<p class="ec-base-help ' +data.comment_reply['password_rule_help_display_class']+ '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
                        aHtml.push('<div class="ctrl">');
                        if (data.comment_reply['comment_secret_display'] == true) {
                            aHtml.push('<label class="secret">'+data.comment_reply['secure']+' 비밀댓글</label>');
                        }
                        aHtml.push('<div class="button"><a href="#none" onclick="' +data.comment_reply['action_comment_insert']+ '" class="btnSubmit sizeM">등록</a></div>');
                        aHtml.push('</div>');
                        aHtml.push('</div>');
                        aHtml.push('<div class="byteRating"><p class="byte '+data.comment_reply['use_comment_size']+'">'+data.comment_reply['comment_byte']+' / '+data.comment_reply['comment_size']+' byte</p></div>');
                        aHtml.push('<div class="captcha ' +data.comment_reply['use_captcha']+ '"><span class="img"></span><div class="form">' +data.comment_reply['captcha_image']+data.comment_reply['captcha_refresh']+data.comment_reply['captcha']+ '<p class="ec-base-help">왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p></div></div>');
                        aHtml.push('</div>');
                        aHtml.push('</form>');
                    }
                }

                $(pNode).after('<tr id="product-qna-read'+data.key+'" class="'+ data.read['block_target_class'] +'" '+ data.read['block_data_attr'] +'><td colspan="6">'+aHtml.join('')+'</td></tr>');

                // 평점기능 사용안함일 경우 보여지는 td를 조절하기 위한 함수
                PRODUCT_COMMENT.comment_colspan(pNode);
                // 게시물 작성자 차단 기능
                APP_BOARD_BLOCK.setBlockList();
                // 게시물 신고 기능
                APP_BOARD_REPORT.setReportLayerActions(data.read['report_action'], data.read['report_close_layer_action'], data.write_auth);

                if (data.comment_write != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(6, data.key);
                if (data.comment_reply != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(6, data.key, 'commentReplyWriteForm');
				if (data.read['ucc_url']) $('#ec-ucc-media-box-'+ data.read['no']).replaceWith(APP_BOARD_UCC.getPreviewElement(data.read['ucc_url']));
            }
        });
    },

        // 댓글 보기
    comment_view : function (sId)
    {
        if ($('#commentList_'+sId).css('display') == 'none') {
            $('#commentList_'+sId).show();
        } else {
            $('#commentList_'+sId).hide();
        }
    },

    // 댓글의 댓글 보기
    comment_reply_view : function (iCommentNo)
    {
        $('[id^="replyArea_'+iCommentNo+'_"]').each(function(e) {
            if ($(this).css('display') == 'none') {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    },

    // 댓글 쓰기
    comment_write : function (e)
    {
        var $form = $("#commentWriteForm_6");
        if ($form.css('display') == 'none') {
            $form.css('display', 'block');

            var $p = $(e).parent().parent();
            if ( $(e).parent().find('#commentWriteForm_6').length < 1 ) {
                $p.after($form);
            }
        } else {
            $form.hide();
        }
    },

    END : function() {}
};