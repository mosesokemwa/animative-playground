import { AnimatedView, TextInput } from "@/components/Themed";
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

export default function SiteEntryScreen() {
  const handleLogin = (values: any) => {
    console.log("Login values:", values);
  };

  return (
    <AnimatedView
      style={{
        justifyContent: "center",
        backgroundColor: "orange",
        // borderWidth: 2,
        margin: 20,
        padding: 20,
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
          </>
        )}
      </Formik>
    </AnimatedView>
  );
}
