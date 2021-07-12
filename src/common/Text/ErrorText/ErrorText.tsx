interface Props {
  children: string;
}

export default function ErrorText({ children }: Props): JSX.Element {
  return (
    <h1 className="mb-4 md:mb-6 lg:mb-9 text-3xl md:text-5xl lg:text-9xl font-bold tracking-tight text-black dark:text-white">
      {children}
    </h1>
  );
}
