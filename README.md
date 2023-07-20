# petsitter

내배캠 petsitter 프로젝트

API 명세

회원가입 POST /signup  
로그인 POST /login  
회원 정보 조회 GET /user  
회원 정보 수정 PUT /user  
회원 탈퇴 DELETE /user  

펫시터 전체 조회 GET /petsitters  

예약 조회 GET /bookings  
예약 생성 POST /bookings/:petSitterId  
예약 수정 PUT /bookings/:bookingId  
예약 취소 DELETE /bookings/:bookingId  

리뷰 조회 GET /reviews/:petSitterId  
리뷰 작성 POST /reviews/:petSitterId  
리뷰 수정 PUT /reviews/:reviewId  
리뷰 삭제 DELETE /reviews/:reviewId  