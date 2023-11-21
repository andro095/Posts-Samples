When embarking on a project that involves using a library, it’s common practice to consult the library’s documentation to understand its usage. One such library is Formik. This powerful tool not only handles form validations and submit events but also provides integrated inputs with Formik and hooks for those who prefer not to use the provided inputs.

Despite the comprehensive examples provided in the Formik documentation, one area that lacks detailed examples is the use of hooks with nested objects. This article aims to fill that gap and provide guidance on integrating nested objects using only the library hooks.

For those interested in a hands-on approach, all the code used for this tutorial can be found [here](https://github.com/andro095/Posts-Samples/tree/master/useFormik). 

Additionally, a working demo is available [here](https://codesandbox.io/p/sandbox/blazing-glitter-xqqqcx?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clp4qm1eh000a3b5vf2d39oy3%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clp4qm1eh00033b5vo6gc6rvm%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clp4qm1eh00073b5vp1oe9obn%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clp4qm1eh00093b5v2s0jlujd%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B100%252C0%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clp4qm1eh00033b5vo6gc6rvm%2522%253A%257B%2522id%2522%253A%2522clp4qm1eh00033b5vo6gc6rvm%2522%252C%2522activeTabId%2522%253A%2522clp4tpzlh04vr3b5vm79488kh%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clp4qm1eh00023b5v3lvvto50%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.tsx%2522%252C%2522id%2522%253A%2522clp4qmfhs00633b5vhd3yduml%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.css%2522%252C%2522id%2522%253A%2522clp4qvdsg00p53b5voxmum94g%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Futils.ts%2522%252C%2522id%2522%253A%2522clp4tpzlh04vr3b5vm79488kh%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Ftypes.ts%2522%252C%2522id%2522%253A%2522clp543pn30ewv3b5vt5xvdfci%2522%252C%2522mode%2522%253A%2522temporary%2522%257D%255D%257D%252C%2522clp4qm1eh00093b5v2s0jlujd%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clp4qm1eh00083b5v97f1ia9x%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clp4qm1eh00093b5v2s0jlujd%2522%252C%2522activeTabId%2522%253A%2522clp4qm1eh00083b5v97f1ia9x%2522%257D%252C%2522clp4qm1eh00073b5vp1oe9obn%2522%253A%257B%2522id%2522%253A%2522clp4qm1eh00073b5vp1oe9obn%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clp4qm1eh00043b5vdny8p9lo%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%252C%257B%2522id%2522%253A%2522clp4qm1eh00053b5vdk85wkcc%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522build%2522%257D%252C%257B%2522id%2522%253A%2522clp4qm1eh00063b5vmpj354mx%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522preview%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clp4qm1eh00043b5vdny8p9lo%2522%257D%257D%252C%2522showDevtools%2522%253Afalse%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A24.907407407407405%257D).

### Getting Started with Initial Values

In this example, we will use the useFormik hook. However, the techniques discussed can be applied to any hook in the library. We begin by declaring the initial object along with its typing and validations by Yup library.

```
interface  UserInfo  {
	personal:  {
		name:  string;
		lastName:  string;
		age:  number;
	};
	location:  {
		address:  string;
		country:  string;
	};
}

const  initialValues:  UserInfo  =  {
	personal:  {
		name:  "",
		lastName:  "",
		age:  0,
	},
	location:  {
		address:  "",
		country:  "",
	},
};

const  validationSchema  =  yup.object().shape({
	personal:  yup.object().shape({
		name:  yup.string().required("Name is required"),
		lastName:  yup.string().required("Last name is required"),
		age:  yup
		.number()
		.required("Age is required")
		.min(1,  "You should have at least 1 year"),
	}),
	location:  yup.object().shape({
		address:  yup.string().required("Address is required"),
		country:  yup.string().required("Country is required"),
	}),
});
```

### Formik Initialization
Next, we initialize Formik, which will be used to manage our form.

```
const  formik  =  useFormik<UserInfo>({
	initialValues,
	validationSchema,
	onSubmit:  (values, { resetForm })  =>  {
		console.log("values: ",  values);
		toast.current?.show({
			severity:  "success",
			summary:  "Form submitted",
			detail:  "The form was submitted",
		});
		resetForm();
	},
});
```

### Inputs: The Key to Using Nested Objects

To avoid redundancy, we will create some specialized inputs for use in our example form. Here, we expose one of the three types of input that we will create for this form. The other two can be found in the demo or in the code repository.


```
<InputText
	id={name}
	name={name}
	value={get(formik.values,  name)}
	onChange={formik.handleChange}
	onBlur={formik.handleBlur}
	className={classNames({  "p-invalid":  isInvalid(name,  formik)  })}
/>
```

### The Result

After examining the components that make up the form, we arrive at something similar to the following:

```
function  App()  {
	const  toast  =  useRef<Toast>(null);

	const  formik  =  useFormik<UserInfo>({
		initialValues,
		validationSchema,
		onSubmit:  (values, { resetForm })  =>  {
			console.log("values: ",  values);
			toast.current?.show({
				severity:  "success",
				summary:  "Form submitted",
				detail:  "The form was submitted",
			});
			resetForm();
		},
	});

	return  (
		<div  className="App">
		<Toast  ref={toast}  />
		<form
			className="w-full h-full flex flex-column align-items-center"
			onSubmit={formik.handleSubmit}
		>
			<h1>useFormik with nested objects</h1>
			<h2>Personal Info</h2>
			<div  className="flex flex-column gap-4">
				<MInputText  
					name="personal.name"  
					label="Name"  
					formik={formik}  
				/>
				<MInputText
					name="personal.lastName"
					label="Last name"
					formik={formik}
				/>
				<MInputNumber  
					name="personal.age" 
					label="Age" 
					formik={formik}
				/>
			</div>
			<h2>Address Info</h2>
			<div  className="flex flex-column gap-4">
			<MInputText  
				name="location.address"  
				label="Address"  
				formik={formik}  
			/>
			<MDropdown
				name="location.country"
				label="Country"
				formik={formik}
				options={countries}
			/>
			</div>
			<Button  
				label="Send Form"  
				type="submit"  
				className="mt-4"
			/>
		</form>
		</div>
	);
}
```

Using nested objects with useFormik hooks is not as daunting as it may seem. The key is to remember to use the fieldobj notation to edit the fields and an auxiliary function to obtain the values.	

### Bibliography
Formik: https://formik.org/docs/overview


