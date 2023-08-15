//Auth Screens
import Splash from '../containers/splash/Splash';
import Tutorial from '../containers/tutorial/Tutorial';
import Login from '../containers/authentication/login/Login';
import Registration from '../containers/authentication/registration/Registration';
import ForgotPassword from '../containers/authentication/forgotPassword/ForgotPassword';
import HouseAt from '../containers/home/screens/HouseAt';
import CommunityAt from '../containers/home/screens/CommunityAt';
import WaterLeaks from '../containers/home/WaterLeaks';
import Encroachments from '../containers/home/screens/Encroachments';
import Report from '../containers/home/screens/Report';
import AddReportDetail from '../containers/home/screens/AddReportDetail';
import SubmitReport from '../containers/home/screens/SubmitReport';
import ThankYou from '../containers/home/screens/ThankYou';
import Settings from '../containers/settings/Settings';
import Reports from '../containers/settings/Reports';
import EditProfile from '../containers/settings/EditProfile';
import PrivacySettings from '../containers/settings/PrivacySettings';
import ContactUs from '../containers/settings/ContactUs';
import EmailUs from '../containers/settings/EmailUs';
import ChangePassword from '../containers/settings/ChangePassword';
import TermsAndConditions from '../containers/settings/TermsAndConditions';
import Webview from '../containers/connect/WebView';
import NewsWebView from '../containers/news/newsWebView';
import ReadAllNews from '../containers/news/ReadAllNews';
import ChooseRegisterSign from '../containers/authentication/login/chooseRegisterSign';
import ReportScreen from '../containers/report/ReportScreen';
import didyouKnow from '../containers/home/didyouKnow';


//Tab bar screen
import HomeTab from '../containers/home/HomeTab';
import NewsTab from '../containers/news/NewsTab';
import NewsDetail from '../containers/news/NewsDetail';
import ReportTab from '../containers/report/ReportTab';
import ConnectTab from '../containers/connect/ConnectTab';
import ContactTab from '../containers/contact/ContactTab';
import NotificationScreen from '../containers/home/NotificationScreen';


// Bottom Tab Navigator Screens
export const TabBarRoutes = {
  HomeTab,
  NewsTab,
  ReportTab,
  ConnectTab,
  ContactTab,
};

// All Stack Routes Screens
export const StackRoutes = {
  Splash,
  Tutorial,
  Login,
  Registration,
  ForgotPassword,
  HouseAt,
  CommunityAt,
  WaterLeaks,
  Encroachments,
  Report,
  AddReportDetail,
  SubmitReport,
  ThankYou,
  Settings,
  Reports,
  EditProfile,
  PrivacySettings,
  ContactUs,
  EmailUs,
  ChangePassword,
  TermsAndConditions,
  NewsTab,
  NewsDetail,
  Webview,
  NewsWebView,
  ReadAllNews,
  ChooseRegisterSign,
  ReportScreen,
  NotificationScreen,
  didyouKnow
};
