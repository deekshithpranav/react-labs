export default function InputField({ value }) {
  return (
    <input
      type="text"
      id="first_name"
      readOnly
      className="text-gray-900 w-full font-bold font-mono border-none text-sm  p-2.5 dark:bg-gray-700 
        dark:border-gray-600 appearance-none dark:text-white text-center"
      value={value}
    />
  );
}
