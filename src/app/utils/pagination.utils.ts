import counterSchema  from '../models/counterSchema.models';

export async function findPaginated(
    model: any,
    page: number,
    pageSize: number,
    query: any = {},
    sort: any = {}
  ): Promise<any[]> {
    const skip = (page - 1) * pageSize;
    const cursor = model.find(query).sort(sort).skip(skip).limit(pageSize);
    const results = await cursor.exec();
    return results;
  }
  
  export async function getNextSequenceValue(sequenceName: string) {

    const counter = await counterSchema.findById(sequenceName)
  
    if (!counter) {
      const newCounter = new counterSchema({
        _id: sequenceName,
        seq: 0
      })
      await newCounter.save()
      return 0
    } else {
      const sequenceDocument = await counterSchema.findByIdAndUpdate(sequenceName, { $inc: { seq: 1 } }, { new: true });
      return sequenceDocument!.seq;
    }
  }