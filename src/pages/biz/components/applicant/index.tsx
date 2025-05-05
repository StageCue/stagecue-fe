import Applicants from './components/applicant';
import { ApplicantProvider } from './components/Context';

const ApplicantPage = () => {
  
  return (
    <ApplicantProvider>
      <Applicants />
    </ApplicantProvider>
  );
};

export default ApplicantPage;
