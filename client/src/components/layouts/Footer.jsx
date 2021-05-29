export default function Footer() {
    return (
        <footer id="footer">

            <div className="container d-md-flex py-4">

                <div className="me-md-auto text-center text-md-start">
                    <div className="copyright">
                        &copy; Copyright <strong><span>GoodReads</span></strong>. All Rights Reserved
                  </div>
                    <div className="credits">
                        Designed by ITI Students:
                        <a href="https://www.linkedin.com/in/abdelrahman-montaser/" target="_blank" rel="noopener noreferrer"> Abdul-Rahman Montaser </a>-
                        <a href="https://www.linkedin.com/in/hossamkhalil01/" target="_blank" rel="noopener noreferrer"> Hossam Khalil </a>-
                        <a href="https://www.linkedin.com/in/leena-sherif/" target="_blank" rel="noopener noreferrer"> Leena Sherif </a> -
                        <a href="https://www.linkedin.com/in/mai-maher/" target="_blank" rel="noopener noreferrer"> Mai Maher </a> -
                        <a href="https://www.linkedin.com/in/omnia-mostafa-339b4b211/" target="_blank" rel="noopener noreferrer"> Omnia Mustafa </a> -
                        <a href="https://www.linkedin.com/in/sarah-magdy-mostafa/" target="_blank" rel="noopener noreferrer"> Sarah Magdy </a>
                    </div>
                </div>
                <div className="social-links text-center text-md-right pt-3 pt-md-0">
                    <a href="https://github.com/hossamkhalil01/good-reads-mern" className="github"><i className="bx bxl-github"></i></a>
                </div>
            </div>
        </footer >
    );
}