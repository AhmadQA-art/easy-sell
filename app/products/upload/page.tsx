// This tells Next.js that this component runs in the browser (client-side)
// Needed because we're using React hooks like useFormState
'use client';

import { useFormState } from 'react-dom'; // Hook to manage form state and server actions
import { sellYourItemAction } from '@/actions'; // Our server action that handles form submission
import SubmitButton from '@/components/submit-button'; // Custom submit button component

// Initial state for the form - what it looks like when first loaded
const initialState = {
  message: '', // Any general messages (like success or error)
  errors: null, // Field-specific errors from validation
};

// Main component for the upload form page
const UploadFormPage: React.FC = () => {
  // useFormState connects our form to the server action
  // state: current form state (errors, messages)
  // formAction: function to call when form is submitted
  const [state, formAction] = useFormState<any>(
    sellYourItemAction as any, // The server action that processes the form
    initialState // Starting state
  );

  return (
    // Main container with styling (padding, max width, centering)
    <div className="px-12 pt-24 pb-12 min-h-screen max-w-[100rem] mx-auto flex gap-56">
      {/* Left side: Page title and description */}
      <div>
        <h2 className="text-2xl lg:text-4xl mb-4 uppercase pt-12">
          Sell your Item! {/* Page heading */}
        </h2>
        <p className="text-xl">
          Enter details in this form to start selling your item. {/* Instructions */}
        </p>
      </div>

      {/* Right side: The actual form */}
      <div className="mx-auto w-full h-full p-12 rounded-lg border-2 border-gray-500 border-opacity-10 shadow-lg bg-gray-953">
        {/* Show error message if form submission failed */}
        {state?.type === 'error' && (
          <p className="text-lg mb-2 bg-green-951 border-2 border-gray-300 rounded-md p-2 my-4">
            {state.message} {/* Error message from server action */}
          </p>
        )}
        {/* The form that users fill out - action connects to our server action */}
        <form action={formAction}>
          {/* Product Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2">
              Name {/* Label that connects to input below */}
            </label>
            <input type="text" id="name" name="name" /> {/* Text input for product name */}
            {/* Show validation errors for name field if any */}
            {state?.errors?.name && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.name.join(',')} {/* Join multiple errors with commas */}
              </span>
            )}
          </div>

          {/* Product Price Field */}
          <div className="mb-6">
            <label htmlFor="price" className="block mb-2">
              Price {/* Label for price input */}
            </label>
            <input type="number" id="price" name="price" /> {/* Number input for price */}
            {/* Show validation errors for price field */}
            {state?.errors?.price && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.price.join(',')}
              </span>
            )}
          </div>

          {/* Product Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2">
              Description {/* Label for description */}
            </label>
            <textarea id="description" name="description"></textarea> {/* Multi-line text input */}
            {/* Show validation errors for description */}
            {state?.errors?.description && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.description.join(',')}
              </span>
            )}
          </div>

          {/* Image Upload Field */}
          <div className="mb-6">
            <label htmlFor="image" className="block  mb-2">
              Image {/* Label for file input */}
            </label>
            <input type="file" accept="image/*" id="imageUrl" name="imageUrl" /> {/* File input that only accepts images */}
            {/* Show validation errors for image */}
            {state?.errors?.imageUrl && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.imageUrl.join(',')}
              </span>
            )}
          </div>

          {/* Contact Email Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2">
              Contact Email {/* Label for email input */}
            </label>
            <textarea id="contactEmail" name="contactEmail"></textarea> {/* Email input field */}
            {/* Show validation errors for email */}
            {state?.errors?.contactEmail && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.contactEmail.join(',')}
              </span>
            )}
          </div>

          {/* Submit button - handles form submission */}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default UploadFormPage;
