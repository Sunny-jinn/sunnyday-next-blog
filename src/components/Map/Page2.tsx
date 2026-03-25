import Image from 'next/image';

type Props = {
  visible: boolean;
};

const Page2 = ({ visible }: Props) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* {visible && <img src="/assets/intro.png" alt="intro" width={1000} height={1000} />} */}
    </div>
  );
};

export default Page2;
