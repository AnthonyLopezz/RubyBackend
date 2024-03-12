import BrandEntity from "./BrandEntity";
import ColorEntity from "./ColorEntity";

class VehicleEntity {
  public brandId: BrandEntity;
  public colorId: ColorEntity;
  public plate: string;

  constructor(
    brand: BrandEntity,
    color: ColorEntity,
    plate: string,
  ) {
    this.brandId = brand;
    this.colorId = color;
    this.plate = plate;
  }
}
export default VehicleEntity;
