/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : constants.js
Purpose   : constants file to store constants value
*/

const baseUrl = 'https://devvecapi.apnaneta.com/'
const checkValidity = () => {
   if( localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      return true
   }
   else{
      return false
   }
}
export  const constants = {
   votingElectionCode: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
   adminLogin : baseUrl + 'login',
   adminForgot : baseUrl + 'admin_forgot_pwd',
   adminOtp: baseUrl + 'admin_otp_read',
   resetPasswordAdmin : baseUrl + 'admin_reset_pwd',
   stateList: baseUrl + 'constituency/view_state_list ',
   viewAllState: baseUrl + 'user/view_all_state ',
   viewAllDistrictList: baseUrl + 'user/view_all_district ',
   viewDistrictList : baseUrl + 'constituency/view_district_list',
   addState: baseUrl + 'constituency/add_constituency_state',
   addDistrict: baseUrl + 'constituency/add_constituency_district',
   viewConstituencyList: baseUrl + 'constituency/view_vs_constituency_list ',
   viewAllConsti: baseUrl + 'user/view_all_constituency ',
   addConstituency: baseUrl + 'constituency/add_constituency',
   viewPartyList : baseUrl + 'political_party/party_list ',
   addParty : baseUrl + 'political_party/add_party',
   updateParty: baseUrl + 'political_party/update_party',
   returnPartyDetail: baseUrl + 'political_party/return_party_detail',
   deleteParty: baseUrl + 'political_party/delete_party',
   partyGeneralInfo : baseUrl + 'political_party/view_party_profile ',
   partyContactDetail : baseUrl + 'political_party/view_party_contact ',
   partyPublicOpinion : baseUrl + 'political_party/view_party_public_opn',
   partyNews : baseUrl + 'political_party/view_party_news',
   partyHide: baseUrl + 'political_party/hide_party',
   partyUnhide: baseUrl + 'political_party/unhide_party',
   updateBasicDetail: baseUrl + "candidate/upd_cand_basic_detail",
   addCandidate: baseUrl + "candidate/add_candidate",
   deleteCandidate: baseUrl + "candidate/delete_candidate",
   viewCandProfile: baseUrl + "candidate/view_candidate_profile",
   userLogin: baseUrl + 'user/user_login',
   candidateList: baseUrl + 'candidate/view_all_candidate',
   viewAllParty: baseUrl + 'political_party/view_all_party',
   adminProfile : baseUrl + 'return_admin_detail',
   addUserInfo : baseUrl + 'user/add_user_info',
   assetsAndLiabilities : baseUrl + 'candidate/view_cand_assets',
   updateCandidateAsset: baseUrl + 'candidate/update_candidate_asset',
   adminLogout: baseUrl + "admin_logout",
   candNews: baseUrl + "candidate/view_candidate_news",
   candPublicOpinion: baseUrl + 'candidate/view_candidate_public_opn',
   candCriminalRec: baseUrl + 'candidate/view_cand_criminal_rec',
   candAssests: baseUrl + 'candidate/view_cand_assets',
   unHideCandidate: baseUrl + 'candidate/unhide_candidate',
   hideCandidate : baseUrl + "candidate/hide_candidate",
   defaultBasicDetail:  baseUrl + 'candidate/return_cand_basic_details',
   defaultGeneralDetail: baseUrl + 'candidate/return_cand_gen_info',
   defaultCriminal: baseUrl + 'candidate/view_cand_criminal_rec',
   updateGeneral: baseUrl + 'candidate/upd_cand_gen_info',
   defaultOther: baseUrl + 'candidate/return_cand_other_info',
   updateOther: baseUrl + "candidate/upd_cand_other_info",
   defaultContact: baseUrl + "candidate/return_cand_conatct_details",
   updateContact: baseUrl + "candidate/upd_cand_contact_details",
   userComment: baseUrl + "user/user_opinion",
   statusReturn : baseUrl + "user/return_vote_status",
   userVote : baseUrl + "user/user_vote",
   adminDeleteOpinion: baseUrl + "political_party/delete_opinion",
   adminDeletePost: baseUrl + "political_party/delete_news",
   updateCandCriminal: baseUrl + "candidate/update_criminal_record",
   returnOpinionStatus: baseUrl + "user/rtn_opinion_view_status",
   userOpinionLike: baseUrl + "user/user_opinion_views",
   activityLike : baseUrl + "user/user_views",
   userCommentView: baseUrl + "political_party/read_user_comment",
   userCommentAdd : baseUrl + "user/user_comments",
   adminDeleteComm: baseUrl + "political_party/delete_comment",
   userDeleteComment: baseUrl + "user/delete_user_comment",
   lokSabhaConst: baseUrl + 'constituency/view_ls_constituency_list',
   userForgotPassword : baseUrl + 'user/forgot_pwd',
   userDeleteOpinion: baseUrl + 'user/delete_user_opinion',
   AdminElectionList: baseUrl + 'election/election_list',
   AdminUserList : baseUrl + 'user/view_user_list',
   AdminDeleteElection : baseUrl + 'election/delete_election ',
   AdminUserDelete : baseUrl + 'user/delete_user',
   userDelete : baseUrl + 'user/delete_user_profile ',
   imageUpload :  baseUrl + 'political_party/image_upload',
   returnFollowStatus : baseUrl + 'user/return_follow_unfollow_status',
   followUnfollow : baseUrl + 'user/followUnFollow',
   electionHide : baseUrl + 'election/hide_unhide_election',
   userBlock : baseUrl + 'user/user_block_unblock ',
   globalSearch : baseUrl + 'political_party/global_search',
   commonSearch: baseUrl + 'political_party/common_search',
   getCandidatesList: baseUrl + 'candidate/return_candidate_list',
   getPartiesList: baseUrl + 'political_party/return_party_list',
   getElectionsListForPost : baseUrl + 'election/return_election_list',
   addPost: baseUrl + 'political_party/add_post',
   electionDetailDistrictReturn : baseUrl + 'election/view_elc_state_dis',
   electionDetailConstituencyReturn : baseUrl + 'election/election_constituency_list',
   candidateAsPerElection : baseUrl + 'election/return_candidate_as_elc',
   totalCandidateParty : baseUrl + 'election/total_party_and_cand',
   forgotPasswordOtpRead : baseUrl + 'user/otp_read',
   resetPasswordUser : baseUrl + 'user/reset_pwd',
   adminUpdateProfile : baseUrl + 'update_admin_profile',
   browseElection : baseUrl + 'user/browse_election',
   partyFilter : baseUrl + 'political_party/party_filter ',
   electionFilter: baseUrl + 'election/election_filter ',
   candidateFilter: baseUrl + 'candidate/candidate_filter',
   addElection: baseUrl + 'election/add_election',

   // <-----------------------user-section----------------------->

   userHomePosts: baseUrl + 'user/home_page_post',
   userRegistration: baseUrl + 'user/user_registration',
   userResendOtp: baseUrl + 'user/resend_otp',
   userProfileView : baseUrl + 'user/return_user_detail',
   userVerifyOtp: baseUrl + 'user/verify_otp',
   candidatePublicOpinion : baseUrl + 'candidate/view_candidate_public_opn',
   candidateNews : baseUrl + 'political_party/view_activity',
   candidateElectionsRecord : baseUrl + 'candidate/view_cand_elc_rec',
   candidateCriminalSection : baseUrl + 'candidate/view_cand_criminal_rec',
   userLogout: baseUrl + 'user/user_logout',
   userSocialLogin: baseUrl + 'user/user_social_login',
   userReturnProfile : baseUrl + 'user/return_user_detail',
   userUpdateProfile : baseUrl + 'user/update_user_profile',
   changeUserPassword: baseUrl + "user/change_user_password",
   electionPartyDetail: baseUrl + 'political_party/view_party_elc_record',
   topParties: baseUrl + 'political_party/view_top_party',
   topCandidates: baseUrl + 'political_party/view_top_candidate',
   allConstituencyApi : baseUrl + 'election/election_all_constituency',
   userDeactivatedStatusApi : baseUrl + 'user/user_deactive_status',
   electionStatusApi : baseUrl + 'election/election_list_with_status',
   viewPublicOpinion: baseUrl + 'political_party/view_public_opinion ',
   viewRecentPost: baseUrl + 'political_party/view_recent_post ',
   electionWinnerApi : baseUrl + 'election/mark_candidate_winner ',
   adminCandidateListApi : baseUrl + 'candidate/candidate_list_return',
   constituencyNewsApi : baseUrl + 'constituency/view_constituency_news',
   cosntituencyPublicOpinion : baseUrl + 'constituency/view_constituency_public_opn',
   addConstituencyDesc : baseUrl + 'constituency/add_constituency_description',
   constituencyHistoryApi : baseUrl + 'constituency/view_constituency_history',
   userSiteFeedback: baseUrl + 'user/user_feedback',
   addPoll : baseUrl + 'political_party/add_poll ',
   viewPoll : baseUrl + 'political_party/view_recent_polls',
   filterGlobalSearch : baseUrl + 'political_party/filter_global_search',

   //================================================ Validity Messages ======================================================

   msg: {
      parameterEmpty : 'Please fill all the fields to continue.',
      emailEmpty : 'Please enter email to continue.',
      passwordEmpty : 'Please enter password to continue.',
      passwordLength : 'Minimun length of password should be 6.',
      samePasswordCheck : 'Password did not match.',
      invalidEmail : 'Please enter valid email to continue.',
      nameEmpty : 'Please enter name to continue.',
      fatherNameEmpty : 'Please enter father name to continue.',
      mobileInvalid : 'Please enter valid mobile number.',
      otpEmpty : 'Please enter OTP to continue.',
      otpNotMatch : 'OTP you entered is not correct.',
      requiredCheck : 'This field is required',
      registrationStateCheck: 'Select state to continue.',
      partyNameCheck : 'Please enter party name to continue.',
      partyCheck : 'Please select party name to continue.',
      dobEmpty: 'Please enter DOB to continue.',
      searchEmpty : 'Please enter something to search.',
      noRecordFound : 'No Record Found.',
      otpVerifyMsg : 'Verify the OTP sent to your mail.',
      LoginContinueMsg : 'Please login to continue.',
      feedbackEmpty: 'Please share your thoughts to continue',
      feedbackSubmitted: 'Your feedback has been submitted',
      electionName: 'Please enter election name to continue',
      electionType: 'Please select election type to continue',
      electionStatus: 'Please select election status to continue',
      electionStartDate: 'Please select election start date to continue',
      electionEndDate: 'Please select election end date to continue',
      electionSummary: 'Please enter election summary to continue'
   },

   // Profession and religion array

   professions: ["Air Force", "Business Person", "Camera Man", "Charity / Social Work", "Chartered Accountant", "College / University Teacher", "Diplomat", "Doctor ", "Engineer", "Film Producer", "Government Service", "House Wife", "Journalist", "Labour", "Lawyer", "Media", "Military", "Missionary", "Navy", "News Broadcaster", "Official", "Others", "Police", "Press", "Private Service", "Publisher", "Reporter", "Researcher", "Retired", "Sea Man", "Self-Employed / Freelancer", "Student", "Trader", "TV Producer", "Unemployed", "UN Official", "Worker", "Writer"],
   religions: ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism', 'Other'],
   checkUserValidity: checkValidity()
}
