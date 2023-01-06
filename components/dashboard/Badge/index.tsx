type Props = {
  content: number;
  color: string;
  props?: any;
};

const Badge = ({ content, props, color }: Props) => {
  return (
    <p className={Number(content) > 0 ? color : 'visibility-none'} {...props}>
      {content}
    </p>
  );
};

export default Badge;
