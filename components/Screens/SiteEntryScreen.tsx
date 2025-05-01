import { TextInput, View } from "@/components/Themed";
import { Formik } from "formik";
import * as Yup from "yup";

const siteLoginSchema = Yup.object().shape({
  loginType: Yup.string().required("Login type is required"),
  loginTerm: Yup.string().when("loginType", {
    is: (val: any) => ["crqNumber", "incNumber"].includes(val),
    then: (schema) => schema.required("Login term is required"),
  }),
  loginReason: Yup.string().required("Login reason is required"),
});

const siteLoginInitialValues = {
  loginType: "",
  loginTerm: "",
  loginReason: "",
};

const CONTENT_SPACING = 20;

export default function SiteEntryScreen() {
  const handleLogin = (values: any) => {
    console.log("Login values:", values);
  };

  return (
    <View
      style={{
        backgroundColor: "inherit",
        margin: CONTENT_SPACING,
        padding: CONTENT_SPACING,
        width: "90%",
        borderRadius: CONTENT_SPACING,
        alignSelf: "center",
      }}
    >
      <Formik
        initialValues={siteLoginInitialValues}
        validationSchema={siteLoginSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Login Type"
              onChangeText={handleChange("loginType")}
              onBlur={handleBlur("loginType")}
              value={values.loginType}
              error={touched.loginType && errors.loginType}
            />
            <TextInput
              placeholder="Login Type"
              onChangeText={handleChange("loginType")}
              onBlur={handleBlur("loginType")}
              value={values.loginType}
              error={touched.loginType && errors.loginType}
            />
          </>
        )}
      </Formik>
    </View>
  );
}
