// import React from 'react'
// import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import { Fonts, FontsGeneral } from '../style'
// import Dot from 'react-native-vector-icons/Entypo'
// const PrivacyAndPolicy = () => {
//   return (
//     <ScrollView>
//    <View style={{paddingHorizontal:15,flex:1}}>
//     <Text style={styles.parapgrahheading} >This Privacy Policy applies to the Washta app (hereby referred to as the "Application") for mobile devices, created by Muhammad Raheel (hereby referred to as the "Service Provider") as a free service. This service is intended for use "AS IS".</Text>
//     <Text style={styles.heading}>
//     1. Information Collection and Use
//     </Text>
//     <Text style={styles.parapgrahheading}>The Application collects certain information when you download and use it. This may include.</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> Your device's Internet Protocol address (e.g., IP address)</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20, }}/> The pages of the Application that you visit, the time and date of your visit, and the time spent on those pages</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20, }}/> The time spent on the Application</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20, }}/> The operating system you use on your mobile device</Text>
//     <Text style={styles.parapgrahheading}>The Application also collects your device's location, which helps the Service Provider determine your approximate geographical location for the following purposes:</Text>
//     <Text style={styles.heading}>
//     Geolocation Services:
//     </Text>
//     <Text style={styles.parapgrahheading}>Location data is utilized to provide features such as personalized content, relevant recommendations, and location-based services.</Text>
//     <Text style={styles.heading}>
//     Analytics and Improvements: 
//     </Text>
//     <Text style={styles.parapgrahheading}>Aggregated and anonymized location data helps the Service Provider analyze user behavior, identify trends, and improve the overall performance and functionality of the Application.</Text>
//     <Text style={styles.heading}>
//     Third-Party Services:
//     </Text>
//     <Text style={styles.parapgrahheading}>Periodically, anonymized location data may be transmitted to external services to enhance the Application and optimize offerings.</Text>
//     <Text style={styles.parapgrahheading}>The Service Provider may use the information you provide to contact you with important information, required notices, and marketing promotions.</Text>
//     <Text style={styles.heading}>
//     Third-Party Access
//     </Text>
//     <Text style={styles.parapgrahheading}>Aggregated, anonymized data may be periodically transmitted to external services to help improve the Application and services. The Service Provider may share your information with third parties as described in this privacy statement.</Text>
//     <Text style={styles.parapgrahheading}>Please note that the Application utilizes third-party services that have their own privacy policies. Below are links to the privacy policies of the third-party service providers used by the Application:</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> Google Play Service</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> Google Analytics for Firebase</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> Firebase Crashlytics</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> Facebook</Text>
//     <Text style={styles.parapgrahheading}>The Service Provider may disclose user-provided and automatically collected information in the following cases:</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> As required by law, such as to comply with a subpoena or similar legal process.</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> When they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.</Text>
//     <Text style={styles.parapgrahheading}><Dot name="dot-single" style={{fontSize:20}}/> With trusted service providers who work on their behalf, who do not have an independent use of the information disclosed to them, and who have agreed to adhere to the rules set forth in this privacy statement.</Text>
//     <Text style={styles.heading}>
//     Opt-Out Rights
//     </Text>
//     <Text style={styles.parapgrahheading}>You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes available as part of your mobile device or via the mobile application marketplace or network.</Text>
//     <Text style={styles.heading}>
//     Data Retention Policy
//     </Text>
//     <Text style={styles.parapgrahheading}> The Service Provider will retain user-provided data for as long as you use the Application and for a reasonable time thereafter. If you would like them to delete user-provided data that you have provided via the Application, please contact them at bigwalstudio@gmail.com and they will respond within a reasonable time.</Text>
//     <Text style={styles.heading}>
//     Children
//     </Text>
//     <Text style={styles.parapgrahheading}> The Service Provider does not knowingly solicit data from or market to children under the age of 13. If the Service Provider discovers that a child under 13 has provided personal information, they will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided personal information, please contact the Service Provider at bigwalstudio@gmail.com so that necessary actions can be taken.</Text>
//     <Text style={styles.heading}>
//     Security
//     </Text>
//     <Text style={styles.parapgrahheading}> The Service Provider is concerned about safeguarding the confidentiality of your information. They provide physical, electronic, and procedural safeguards to protect the information processed and maintained.</Text>
//     <Text style={styles.heading}>
//     Changes
//     </Text>
//     <Text style={styles.parapgrahheading}> This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.</Text>
//     <Text style={styles.parapgrahheading}> This Privacy Policy is effective as of <Text style={{fontFamily:FontsGeneral.MEDIUMSANS}}> 2024-06-10. </Text> </Text>
//     <Text style={styles.heading}>
//     Your Consent
//     </Text>
//     <Text style={styles.parapgrahheading}> By using the Application, you consent to the processing of your information as set forth in this Privacy Policy now and as amended by the Service Provider.</Text>
//     <Text style={styles.heading}>
//     Contact Us
//     </Text>
//     <Text style={styles.parapgrahheading}> If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at bigwalstudio@gmail.com.</Text>
//    </View>
//    </ScrollView>
//   )
// }
// const styles = StyleSheet.create({
//   heading:{
//     fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:16
//   },
//   parapgrahheading:{
//     fontFamily:Fonts.REGULAR,color:'black',paddingTop:5,paddingBottom:10,
//     position:'relative'
//   }
// })
// export default PrivacyAndPolicyimport React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Dot from 'react-native-vector-icons/Entypo';
import { FontsGeneral } from '../style';

const PrivacyAndPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          This Privacy Policy applies to the Washta app (hereby referred to as the "Application") for mobile devices, created by Muhammad Raheel (hereby referred to as the "Service Provider") as a free service. This service is intended for use "AS IS".
        </Text>
        <Text style={styles.heading}>1. Information Collection and Use</Text>
        <Text style={styles.paragraph}>
          The Application collects certain information when you download and use it. This may include:
        </Text>
        {[
          "Your device's Internet Protocol address (e.g., IP address)",
          "The pages of the Application that you visit, the time and date of your visit, and the time spent on those pages",
          "The time spent on the Application",
          "The operating system you use on your mobile device",
        ].map((item, index) => (
          <Text key={index} style={styles.bulletPoint}>
            <Dot name="dot-single" style={styles.bulletIcon} /> {item}
          </Text>
        ))}

        <Text style={styles.paragraph}>
          The Application also collects your device's location, which helps the Service Provider determine your approximate geographical location for the following purposes:
        </Text>

        <Text style={styles.heading}>Geolocation Services:</Text>
        <Text style={styles.paragraph}>
          Location data is utilized to provide features such as personalized content, relevant recommendations, and location-based services.
        </Text>

        <Text style={styles.heading}>Analytics and Improvements:</Text>
        <Text style={styles.paragraph}>
          Aggregated and anonymized location data helps the Service Provider analyze user behavior, identify trends, and improve the overall performance and functionality of the Application.
        </Text>

        <Text style={styles.heading}>Third-Party Services:</Text>
        <Text style={styles.paragraph}>
          Periodically, anonymized location data may be transmitted to external services to enhance the Application and optimize offerings.
        </Text>

        <Text style={styles.paragraph}>
          The Service Provider may use the information you provide to contact you with important information, required notices, and marketing promotions.
        </Text>

        <Text style={styles.heading}>Third-Party Access</Text>
        <Text style={styles.paragraph}>
          Aggregated, anonymized data may be periodically transmitted to external services to help improve the Application and services. The Service Provider may share your information with third parties as described in this privacy statement.
        </Text>

        <Text style={styles.paragraph}>
          Please note that the Application utilizes third-party services that have their own privacy policies. Below are links to the privacy policies of the third-party service providers used by the Application:
        </Text>

        {[
          "Google Play Service",
          "Google Analytics for Firebase",
          "Firebase Crashlytics",
          "Facebook",
        ].map((item, index) => (
          <Text key={index} style={styles.bulletPoint}>
            <Dot name="dot-single" style={styles.bulletIcon} /> {item}
          </Text>
        ))}

        <Text style={styles.paragraph}>
          The Service Provider may disclose user-provided and automatically collected information in the following cases:
        </Text>

        {[
          "As required by law, such as to comply with a subpoena or similar legal process.",
          "When they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.",
          "With trusted service providers who work on their behalf, who do not have an independent use of the information disclosed to them, and who have agreed to adhere to the rules set forth in this privacy statement.",
        ].map((item, index) => (
          <Text key={index} style={styles.bulletPoint}>
            <Dot name="dot-single" style={styles.bulletIcon} /> {item}
          </Text>
        ))}

        <Text style={styles.heading}>Opt-Out Rights</Text>
        <Text style={styles.paragraph}>
          You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes available as part of your mobile device or via the mobile application marketplace or network.
        </Text>

        <Text style={styles.heading}>Data Retention Policy</Text>
        <Text style={styles.paragraph}>
          The Service Provider will retain user-provided data for as long as you use the Application and for a reasonable time thereafter. If you would like them to delete user-provided data that you have provided via the Application, please contact them at bigwalstudio@gmail.com and they will respond within a reasonable time.
        </Text>

        <Text style={styles.heading}>Children</Text>
        <Text style={styles.paragraph}>
          The Service Provider does not knowingly solicit data from or market to children under the age of 13. If the Service Provider discovers that a child under 13 has provided personal information, they will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided personal information, please contact the Service Provider at bigwalstudio@gmail.com so that necessary actions can be taken.
        </Text>

        <Text style={styles.heading}>Security</Text>
        <Text style={styles.paragraph}>
          The Service Provider is concerned about safeguarding the confidentiality of your information. They provide physical, electronic, and procedural safeguards to protect the information processed and maintained.
        </Text>

        <Text style={styles.heading}>Changes</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
        </Text>

        <Text style={styles.paragraph}>
          This Privacy Policy is effective as of <Text style={styles.boldText}>2024-06-10</Text>.
        </Text>

        <Text style={styles.heading}>Your Consent</Text>
        <Text style={styles.paragraph}>
          By using the Application, you consent to the processing of your information as set forth in this Privacy Policy now and as amended by the Service Provider.
        </Text>

        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at bigwalstudio@gmail.com.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    color: 'black',
    fontSize: 16,
    marginTop: 15,
  },
  paragraph: {
    fontFamily: FontsGeneral.REGULARSANS,
    color: 'black',
    paddingTop: 5,
    paddingBottom: 10,
  },
  bulletPoint: {
    fontFamily: FontsGeneral.REGULARSANS,
    color: 'black',
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  boldText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
});

export default PrivacyAndPolicy;
