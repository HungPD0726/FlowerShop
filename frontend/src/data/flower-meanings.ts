export type FlowerIntent = "love" | "gratitude" | "celebration" | "prosperity" | "peace";

export interface FlowerColorMeaning {
  name: string;
  hex: string;
  message: string;
}

export interface FlowerMeaning {
  id: string;
  name: string;
  scientificName: string;
  shortMeaning: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  intents: FlowerIntent[];
  colors: FlowerColorMeaning[];
  occasions: string[];
  recipients: string[];
  productFlowerType: string;
  note: string;
}

export const FLOWER_INTENTS: ReadonlyArray<{
  id: "all" | FlowerIntent;
  label: string;
  description: string;
}> = [
  { id: "all", label: "Tất cả", description: "Khám phá toàn bộ ngôn ngữ hoa" },
  { id: "love", label: "Tình yêu", description: "Sự gắn bó, dịu dàng và lãng mạn" },
  { id: "gratitude", label: "Biết ơn", description: "Lời cảm ơn và sự trân trọng" },
  { id: "celebration", label: "Chúc mừng", description: "Niềm vui cho những cột mốc mới" },
  { id: "prosperity", label: "Thịnh vượng", description: "May mắn, thành công và viên mãn" },
  { id: "peace", label: "Bình an", description: "Sự an nhiên, sẻ chia và tưởng nhớ" },
];

export const FLOWER_MEANINGS: ReadonlyArray<FlowerMeaning> = [
  {
    id: "hoa-hong",
    name: "Hoa hồng",
    scientificName: "Rosa spp.",
    shortMeaning: "Tình yêu, lòng trân trọng và sự gắn bó",
    description:
      "Hoa hồng thường được chọn khi người tặng muốn nói về một tình cảm rõ ràng. Sắc hoa quyết định sắc thái của lời nhắn, từ nồng nhiệt đến dịu dàng hoặc trang trọng.",
    imageSrc: "/images/flower-meanings/rose.webp",
    imageAlt: "Một bông hoa hồng đỏ nở trên nền lá xanh",
    intents: ["love", "gratitude"],
    colors: [
      { name: "Đỏ", hex: "#B4232D", message: "Tình yêu sâu đậm và một lời cam kết chân thành." },
      { name: "Hồng", hex: "#E68A98", message: "Sự dịu dàng, ngưỡng mộ và lòng biết ơn." },
      { name: "Trắng", hex: "#F4EFE9", message: "Sự trong sáng, tôn trọng và một khởi đầu mới." },
    ],
    occasions: ["Kỷ niệm", "Sinh nhật", "Lời cảm ơn"],
    recipients: ["Người yêu", "Vợ hoặc chồng", "Người bạn trân quý"],
    productFlowerType: "Hoa Hồng",
    note: "Ý nghĩa thay đổi theo màu sắc và mối quan hệ giữa người tặng với người nhận.",
  },
  {
    id: "hoa-tulip",
    name: "Hoa tulip",
    scientificName: "Tulipa spp.",
    shortMeaning: "Sự thanh lịch và một tình cảm được nói vừa đủ",
    description:
      "Tulip có dáng hoa gọn, đường nét rõ và cảm giác hiện đại. Loài hoa này phù hợp với lời chúc tinh tế, không quá phô trương nhưng vẫn đủ để người nhận cảm thấy được quan tâm.",
    imageSrc: "/images/flower-meanings/tulip.webp",
    imageAlt: "Cụm hoa tulip hồng đang nở",
    intents: ["love", "celebration"],
    colors: [
      { name: "Đỏ", hex: "#C83A3E", message: "Một tình yêu được bày tỏ thẳng thắn." },
      { name: "Hồng", hex: "#E987A7", message: "Sự quan tâm nhẹ nhàng và lời chúc hạnh phúc." },
      { name: "Vàng", hex: "#E7B83D", message: "Niềm vui, sự lạc quan và tình bạn ấm áp." },
    ],
    occasions: ["Hẹn hò", "Chúc mừng", "Tân gia"],
    recipients: ["Người yêu", "Bạn bè", "Đồng nghiệp"],
    productFlowerType: "Hoa Tulip",
    note: "Tulip thường được dùng như một lời nhắn hiện đại; sắc đỏ và hồng thiên về tình cảm, sắc vàng thiên về niềm vui.",
  },
  {
    id: "hoa-huong-duong",
    name: "Hoa hướng dương",
    scientificName: "Helianthus annuus",
    shortMeaning: "Niềm tin, năng lượng tích cực và sự kiên định",
    description:
      "Dáng hoa luôn hướng về ánh sáng khiến hướng dương gợi nhắc đến sự bền bỉ và tinh thần tiến về phía trước. Đây là lựa chọn sáng rõ cho những cột mốc cần một lời động viên.",
    imageSrc: "/images/flower-meanings/sunflower.webp",
    imageAlt: "Hoa hướng dương vàng với những giọt nước trên cánh",
    intents: ["celebration", "gratitude", "prosperity"],
    colors: [
      { name: "Vàng", hex: "#E7A928", message: "Sự lạc quan, ấm áp và niềm tin vào ngày mới." },
      { name: "Cam", hex: "#D96B2C", message: "Năng lượng, nhiệt huyết và tinh thần hành động." },
    ],
    occasions: ["Tốt nghiệp", "Khai trương", "Sinh nhật"],
    recipients: ["Bạn bè", "Đồng nghiệp", "Thầy cô"],
    productFlowerType: "Hoa Hướng Dương",
    note: "Hướng dương phù hợp với lời chúc và động viên hơn là những thông điệp cần sự trầm lắng.",
  },
  {
    id: "hoa-mau-don",
    name: "Hoa mẫu đơn",
    scientificName: "Paeonia lactiflora",
    shortMeaning: "Sự viên mãn, thanh lịch và lời chúc đủ đầy",
    description:
      "Nhiều lớp cánh đầy đặn tạo cho mẫu đơn vẻ mềm mại nhưng trang trọng. Trong quà tặng, loài hoa này thường đại diện cho một cuộc sống hài hòa và những điều tốt đẹp đang nở rộ.",
    imageSrc: "/images/flower-meanings/peony.webp",
    imageAlt: "Một bông mẫu đơn hồng phấn nở trên nền tối",
    intents: ["prosperity", "love", "celebration"],
    colors: [
      { name: "Hồng", hex: "#E7A5AF", message: "Sự hòa hợp, lãng mạn và một mái ấm viên mãn." },
      { name: "Trắng", hex: "#F1ECE5", message: "Lời chúc tinh tế và sự tôn trọng." },
      { name: "Đỏ", hex: "#A92F3B", message: "May mắn, thịnh vượng và niềm vui lớn." },
    ],
    occasions: ["Lễ cưới", "Tân gia", "Kỷ niệm"],
    recipients: ["Người yêu", "Gia đình", "Đối tác"],
    productFlowerType: "Hoa Mẫu Đơn",
    note: "Mẫu đơn thường được chọn cho dịp trang trọng; thông điệp chính vẫn nên đi kèm lời nhắn của người tặng.",
  },
  {
    id: "hoa-lan",
    name: "Hoa lan",
    scientificName: "Orchidaceae",
    shortMeaning: "Sự quý trọng, bền bỉ và vẻ đẹp tinh tế",
    description:
      "Hoa lan có phom dáng đặc trưng và độ bền cao, phù hợp với món quà cần lưu lại lâu trong không gian. Lan thường được chọn để thể hiện sự kính trọng và lời chúc phát triển bền vững.",
    imageSrc: "/images/flower-meanings/orchid.webp",
    imageAlt: "Cành hoa lan hồng với họa tiết đậm ở tâm hoa",
    intents: ["prosperity", "gratitude", "celebration"],
    colors: [
      { name: "Tím", hex: "#8A5A9B", message: "Sự ngưỡng mộ, trang trọng và chiều sâu." },
      { name: "Hồng", hex: "#D77D9A", message: "Sự duyên dáng, quan tâm và niềm vui nhẹ nhàng." },
      { name: "Trắng", hex: "#F2EFE8", message: "Sự thanh nhã và một lời chúc chân thành." },
    ],
    occasions: ["Khai trương", "Thăng chức", "Tân gia"],
    recipients: ["Đối tác", "Cấp trên", "Gia đình"],
    productFlowerType: "Hoa Lan",
    note: "Lan chậu và lan cắt cành có cảm giác quà tặng khác nhau; nên chọn theo không gian của người nhận.",
  },
  {
    id: "hoa-cam-tu-cau",
    name: "Hoa cẩm tú cầu",
    scientificName: "Hydrangea macrophylla",
    shortMeaning: "Sự thấu hiểu, chân thành và những cảm xúc đầy đặn",
    description:
      "Những bông nhỏ kết thành một cụm lớn khiến cẩm tú cầu gợi cảm giác gắn kết. Loài hoa này hợp với lời cảm ơn, lời xin lỗi chân thành hoặc một sự quan tâm khó diễn đạt thành lời.",
    imageSrc: "/images/flower-meanings/hydrangea.webp",
    imageAlt: "Cụm cẩm tú cầu hồng trắng trong ánh sáng dịu",
    intents: ["gratitude", "peace", "love"],
    colors: [
      { name: "Xanh", hex: "#7D9EAE", message: "Sự thấu hiểu và mong muốn hàn gắn." },
      { name: "Hồng", hex: "#D995A8", message: "Tình cảm chân thành và sự quan tâm." },
      { name: "Trắng", hex: "#F0EEE8", message: "Sự trang nhã và một lời nhắn nhẹ nhàng." },
    ],
    occasions: ["Lời cảm ơn", "Làm hòa", "Kỷ niệm"],
    recipients: ["Người thân", "Bạn bè", "Người yêu"],
    productFlowerType: "Hoa Cẩm Tú Cầu",
    note: "Cẩm tú cầu mang nhiều cách diễn giải giữa các nền văn hóa, vì vậy lời nhắn đi kèm rất quan trọng.",
  },
  {
    id: "hoa-ly",
    name: "Hoa ly",
    scientificName: "Lilium spp.",
    shortMeaning: "Sự trang trọng, sẻ chia và lời chúc thanh nhã",
    description:
      "Hoa ly có cánh mở rộng và hương thơm rõ. Tùy màu sắc và cách cắm, ly có thể xuất hiện trong quà chúc mừng, không gian gia đình hoặc những dịp cần sự thành kính.",
    imageSrc: "/images/flower-meanings/lily.webp",
    imageAlt: "Một bông hoa ly hồng có giọt nước trên cánh",
    intents: ["peace", "gratitude", "celebration"],
    colors: [
      { name: "Trắng", hex: "#F3F0EA", message: "Sự thành kính, bình an và sẻ chia." },
      { name: "Hồng", hex: "#D98AA8", message: "Sự quan tâm, thịnh vượng và tình cảm gia đình." },
      { name: "Vàng", hex: "#D9A930", message: "Niềm vui và lời chúc ấm áp." },
    ],
    occasions: ["Tân gia", "Thăm hỏi", "Chia buồn"],
    recipients: ["Gia đình", "Người lớn tuổi", "Đồng nghiệp"],
    productFlowerType: "Hoa Ly",
    note: "Trong văn hóa Việt Nam, ly trắng thường xuất hiện trong dịp tưởng niệm; cần cân nhắc màu sắc theo hoàn cảnh.",
  },
  {
    id: "hoa-cam-chuong",
    name: "Hoa cẩm chướng",
    scientificName: "Dianthus caryophyllus",
    shortMeaning: "Lòng biết ơn, sự ngưỡng mộ và tình cảm gia đình",
    description:
      "Cẩm chướng có cánh xếp mềm và độ bền tốt. Đây là một lựa chọn gần gũi để nói lời cảm ơn, đặc biệt trong những dịp hướng về cha mẹ, thầy cô hoặc người đã luôn chăm sóc mình.",
    imageSrc: "/images/flower-meanings/carnation.webp",
    imageAlt: "Hoa cẩm chướng màu kem trên nền vải sáng",
    intents: ["gratitude", "love", "peace"],
    colors: [
      { name: "Hồng", hex: "#D98C9D", message: "Lòng biết ơn và tình cảm dành cho mẹ." },
      { name: "Đỏ", hex: "#B43E4A", message: "Sự ngưỡng mộ và tình cảm sâu sắc." },
      { name: "Trắng", hex: "#F0ECE5", message: "Sự tưởng nhớ và lòng trân trọng." },
    ],
    occasions: ["Ngày của Mẹ", "Tri ân", "Sinh nhật"],
    recipients: ["Cha mẹ", "Thầy cô", "Người chăm sóc"],
    productFlowerType: "Hoa Cẩm Chướng",
    note: "Ý nghĩa cẩm chướng gắn chặt với màu hoa; tránh chọn màu chỉ dựa trên sở thích mà bỏ qua hoàn cảnh tặng.",
  },
  {
    id: "hoa-dong-tien",
    name: "Hoa đồng tiền",
    scientificName: "Gerbera jamesonii",
    shortMeaning: "Niềm vui, lời chúc may mắn và tinh thần cởi mở",
    description:
      "Cánh hoa tỏa tròn và bảng màu rực rỡ khiến đồng tiền tạo cảm giác thân thiện, nhiều năng lượng. Đây là loài hoa phù hợp với những dịp cần không khí tươi sáng và một lời chúc dễ đón nhận.",
    imageSrc: "/images/flower-meanings/gerbera.webp",
    imageAlt: "Cận cảnh hoa đồng tiền màu cam rực",
    intents: ["celebration", "prosperity", "gratitude"],
    colors: [
      { name: "Cam", hex: "#D96F31", message: "Năng lượng, sự hứng khởi và lời chúc thành công." },
      { name: "Vàng", hex: "#D9AC2E", message: "Tình bạn, niềm vui và sự lạc quan." },
      { name: "Hồng", hex: "#D9829E", message: "Sự khích lệ và niềm vui dịu dàng." },
    ],
    occasions: ["Khai trương", "Sinh nhật", "Tốt nghiệp"],
    recipients: ["Bạn bè", "Đồng nghiệp", "Đối tác"],
    productFlowerType: "Hoa Đồng Tiền",
    note: "Tên gọi gợi liên tưởng đến tài lộc, nhưng thông điệp phổ biến nhất của hoa vẫn là niềm vui và sự lạc quan.",
  },
  {
    id: "hoa-sen",
    name: "Hoa sen",
    scientificName: "Nelumbo nucifera",
    shortMeaning: "Sự an nhiên, thanh sạch và sức mạnh nội tâm",
    description:
      "Hoa sen gắn với đời sống tinh thần và hình ảnh Việt Nam. Dáng hoa vươn khỏi mặt nước thường được nhắc đến như biểu tượng của sự điềm tĩnh, thanh sạch và khả năng giữ mình qua biến động.",
    imageSrc: "/images/flower-meanings/lotus.webp",
    imageAlt: "Hoa sen trắng hồng giữa những lá sen xanh",
    intents: ["peace", "gratitude", "prosperity"],
    colors: [
      { name: "Hồng", hex: "#D98FA8", message: "Sự trân trọng, an nhiên và tình cảm chân thành." },
      { name: "Trắng", hex: "#F1EFE9", message: "Sự thanh sạch, tĩnh tại và bình an." },
    ],
    occasions: ["Thăm hỏi", "Tân gia", "Tri ân"],
    recipients: ["Gia đình", "Người lớn tuổi", "Người hướng dẫn"],
    productFlowerType: "Hoa Sen",
    note: "Sen có ý nghĩa văn hóa và tinh thần sâu; cách tặng nên giản dị, tôn trọng hoàn cảnh của người nhận.",
  },
];

export function getFlowerMeaning(id: string | null | undefined) {
  return FLOWER_MEANINGS.find((flower) => flower.id === id);
}
