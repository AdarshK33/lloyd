// import React from "react";
// import { formConfig } from "../lib/consts";
// import styles from "../pages/registration/registrationStep1.module.scss";

// interface DynamicFormProps {
//   type: keyof typeof formConfig;
//   formData: any;
//   errors: any;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   handleSubmit: (e: React.FormEvent) => void;
//   extraOptions?: { [key: string]: string[] }; // options per field
// }

// const DynamicForm: React.FC<DynamicFormProps> = ({
//   type,
//   formData,
//   errors,
//   handleChange,
//   handleSubmit,
//   extraOptions = {}
// }) => {
//   const fields = formConfig[type];

//   return (
//     <div className={styles.formSection}>
//       <form onSubmit={handleSubmit} className="form">
//         <div className={styles.formHeadline}>
//           <h2 className={styles.registration}>{(type as any).toUpperCase()}</h2>
//         </div>

//         {fields.map((field: any) => (
//           <div key={field.name} className={styles.inputGroup}>
//             {field.type === "select" ? (
//               <select
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//               >
//                 <option value="">Select {field.label}</option>
//                 {(extraOptions[field.name] || []).map((opt, idx) => (
//                   <option key={idx} value={opt}>{opt}</option>
//                 ))}
//               </select>
//             ) : field.type === "checkbox" ? (
//             //   <label>
//             //     <input
//             //       type="checkbox"
//             //       name={field.name}
//             //       checked={formData[field.name]}
//             //       onChange={handleChange}
//             //     />
//             //     {field.label}
//             //   </label>
//               <div className={styles.checkboxInputGroup}>
//               <label className={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                          name={field.name}
//                   checked={formData[field.name]}
//               onChange={handleChange}
              
//                 />
//                 <span className={styles.customCheckbox}></span>
//                 <span className={styles.TermsConditionsNormal}>
//                   I agree to the
//                 </span>
//                 <span className={styles.TermsConditionsBold}    onClick={() => {
//                     setShowTerms(true);
//                   }}>
//                   {" "}
//                   Terms & Conditions
//                 </span>
//               </label>

               
//             </div>
//             ) : (
//               <input
//                 type={field.type}
//                 name={field.name}
//                 placeholder={field.label}
//                 value={formData[field.name] || ""}
//                 onChange={handleChange}
//               />
//             )}

//             {errors[field.name] && (
//               <span className={styles.validation}>{errors[field.name]}</span>
//             )}
//           </div>
//         ))}

//         <div className={styles.buttonSection}>
//           <button type="submit">Next</button>
//         </div>
//       </form>
//     </div>
//   );
// };


// export default DynamicForm;