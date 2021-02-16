interface Props {
  children: string;
}

export default function ErrorText({children}: Props): JSX.Element {
  return (
    <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl lg:text-9xl dark:text-white md:mb-6 lg:mb-9">
      {children}
    </h1>
  );
}
